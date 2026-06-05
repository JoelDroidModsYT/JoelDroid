/*!
 * JoelDroid Mods — jd-seo.js (V9 Runtime SEO injector)
 * Add to index.html, right before </body>:
 *   <script defer src="/jd-seo.js"></script>
 *
 * V9 highlights:
 *  - Brand "JoelDroid Mods YT" is enforced verbatim, never translated.
 *  - Game titles and brand keywords (VERSION, UPDATE, MOD, APK, etc.) are
 *    locked: the original-language tokens from seo-data.json are preserved
 *    in <title>, og:title, twitter:title and JSON-LD "name".
 *  - Async, non-blocking feed read with in-memory + sessionStorage cache so
 *    OG, Twitter Card and SoftwareApplication JSON-LD are injected the
 *    instant ?mod= is detected (zero render delay on repeat views).
 *  - <html lang> is left untouched (Monetag / app contract preserved).
 */
(function () {
  "use strict";

  var FEED       = "/seo-data.json";
  var SITE_NAME  = "JoelDroid Mods YT";   // brand: NEVER translate or alter
  var CACHE_KEY  = "jd_seo_feed_v9";
  var CACHE_TTL  = 10 * 60 * 1000;        // 10 minutes
  var LD_ID      = "jd-mod-jsonld";

  // ---------- helpers ----------
  function slugify(name) {
    return String(name || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function getModParam() {
    try {
      var p = new URLSearchParams(window.location.search || "");
      return p.get("mod") || p.get("game") || "";
    } catch (e) { return ""; }
  }
  function head() { return document.head || document.getElementsByTagName("head")[0]; }
  function setMetaByName(name, content) {
    if (!content) return;
    var h = head(); if (!h) return;
    var el = h.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); h.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setMetaByProp(prop, content) {
    if (!content) return;
    var h = head(); if (!h) return;
    var el = h.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); h.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setCanonical(href) {
    var h = head(); if (!h) return;
    var el = h.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); h.appendChild(el); }
    el.setAttribute("href", href);
  }
  function findGame(games, gid) {
    if (!gid || !games) return null;
    var dec = decodeURIComponent(gid);
    var sl  = slugify(dec);
    for (var i = 0; i < games.length; i++) {
      var g = games[i];
      if (g.slug === gid || g.id === gid || g.slug === dec || g.id === dec) return g;
      if (slugify(g.name) === sl) return g;
    }
    return null;
  }
  function injectJsonLd(g) {
    var h = head(); if (!h) return;
    var old = document.getElementById(LD_ID);
    if (old) old.remove();
    var ld = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": g.name,                      // original language, never translated
      "operatingSystem": "ANDROID",
      "applicationCategory": "GameApplication",
      "description": g.desc,
      "url": g.url,
      "softwareVersion": g.ver || undefined,
      "dateModified": g.dateModified,
      "datePublished": g.dateModified,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1200" },
      "publisher": { "@type": "Organization", "name": SITE_NAME, "url": location.origin }
    };
    if (g.image) ld.image = g.image;
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.id   = LD_ID;
    s.textContent = JSON.stringify(ld);
    h.appendChild(s);
  }

  function apply(g) {
    // Title and brand-keyword tokens come straight from the feed — no translation.
    document.title = g.title;
    setMetaByName("description", g.desc);
    setMetaByName("robots", "index,follow,max-image-preview:large,max-snippet:-1");
    setMetaByName("last-modified", g.dateModified);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", g.title);
    setMetaByName("twitter:description", g.desc);
    setCanonical(g.url);
    setMetaByProp("og:type", "article");
    setMetaByProp("og:title", g.title);
    setMetaByProp("og:description", g.desc);
    setMetaByProp("og:url", g.url);
    setMetaByProp("og:site_name", SITE_NAME);
    setMetaByProp("og:updated_time", g.dateModified);
    if (g.image) {
      setMetaByProp("og:image", g.image);
      setMetaByName("twitter:image", g.image);
    }
    injectJsonLd(g);
  }

  // ---------- feed cache (instant inject on repeat views) ----------
  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj.t || (Date.now() - obj.t) > CACHE_TTL) return null;
      return obj.d;
    } catch (e) { return null; }
  }
  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: data })); } catch (e) {}
  }

  function run() {
    var gid = getModParam();
    if (!gid) return; // homepage: leave default SEO untouched

    // 1) Instant path: serve from sessionStorage cache if fresh.
    var cached = readCache();
    if (cached && cached.games) {
      var gC = findGame(cached.games, gid);
      if (gC) apply(gC);
    }

    // 2) Async refresh (always runs, updates dateModified in real time).
    fetch(FEED, { cache: "no-cache", credentials: "omit" })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.games) return;
        writeCache(data);
        var g = findGame(data.games, gid);
        if (g) apply(g);
      })
      .catch(function () { /* offline / blocked: keep cached or default SEO */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();

/*!
 * JoelDroid Mods — jd-seo.js (V7 runtime SEO injector)
 * Add to index.html:  <script defer src="/jd-seo.js"></script>
 *
 * On every ?mod= page it sets an aggressive English <title>, dynamic meta
 * description, canonical, Open Graph / Twitter tags and a SoftwareApplication
 * JSON-LD block with the real dateModified of each game (forces Google to show
 * "Updated X hours/days ago"). Reads the slim /seo-data.json feed.
 */
(function () {
  "use strict";
  var FEED = "/seo-data.json";
  var SITE_NAME = "JoelDroid Mods YT";

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
  function setMetaByName(name, content) {
    if (!content) return;
    var el = document.head.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setMetaByProp(prop, content) {
    if (!content) return;
    var el = document.head.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setCanonical(href) {
    var el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
    el.setAttribute("href", href);
  }
  function findGame(games, gid) {
    if (!gid) return null;
    var dec = decodeURIComponent(gid);
    return games.find(function (g) {
      return g.slug === gid || g.id === gid || g.slug === dec || g.id === dec ||
             slugify(g.name) === slugify(dec);
    }) || null;
  }
  function injectJsonLd(g) {
    var id = "jd-mod-jsonld";
    var old = document.getElementById(id);
    if (old) old.remove();
    var ld = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": g.name,
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
    s.id = id;
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
  function apply(g) {
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
    if (g.image) { setMetaByProp("og:image", g.image); setMetaByName("twitter:image", g.image); }
    injectJsonLd(g);
  }

  function run() {
    var gid = getModParam();
    if (!gid) return; // homepage: leave default SEO untouched
    fetch(FEED, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.games) return;
        var g = findGame(data.games, gid);
        if (g) apply(g);
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else { run(); }
})();

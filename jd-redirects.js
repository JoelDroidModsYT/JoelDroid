/*!
 * JoelDroid Mods — jd-redirects.js (V9 client-side 301 replacement)
 * Add to index.html as the FIRST script inside <head>:
 *   <script src="/jd-redirects.js"></script>
 *
 * GitHub Pages cannot do server 301s, so this maps every legacy
 * /mods/<slug>.html (all language prefixes) to the clean /?mod=ID URL.
 * Uses location.replace() so the old URL is wiped from history and Google
 * follows it as a redirect (consolidating the old page's ranking signals).
 *
 * V9: MAP audited against seo-data.json. No duplicate slugs.
 *     truck-simulator-indonesia -> lnwSfQHMO99fadTbfnwD
 *     bus-simulator-indonesia   -> Xt9xo2LPD5ZDaKE3eteV
 */
(function () {
  "use strict";
  // slug (name-based) -> clean param URL. Generated from games.json / seo-data.json.
  var MAP = {
    "bus-simulator-ultimate":        "/?mod=8OajZpH1fJX3mPNo1iqF",
    "truck-simulator-pro-usa":       "/?mod=MycxFXUXAoQwUx7GMXd2",
    "car-parking-multiplayer-2":     "/?mod=uWeUJYbJhCcmjImQ3jEB",
    "global-truck-online":           "/?mod=1",
    "off-the-road-2":                "/?mod=JFjfn0C85QG8HfZcBL1t",
    "moto-wheelie-3d":               "/?mod=ms8TbhI81zTMsRZVfTzm",
    "elite-auto-brasil":             "/?mod=DppGppBkG3RzOdeXVQ9O",
    "car-simulator-2":               "/?mod=DSlBr0MMnQUHIqEKuUPz",
    "car-parking-multiplayer":       "/?mod=02qE0OihFc0ksBiW4pUT",
    "farming-simulator-26":          "/?mod=lc312vOotB1Zv9FkjIzt",
    "truck-simulator-indonesia":     "/?mod=lnwSfQHMO99fadTbfnwD",
    "world-bus-driving-simulator":   "/?mod=JRGS4BVGevTx2V5txgzV",
    "world-truck-driving-simulator": "/?mod=VhQbTpgCbpKD3d8lKIh5",
    "bus-simulator-india":           "/?mod=GqW9GWDAfhLJDlxkbZxM",
    "bus-simulator-indonesia":       "/?mod=Xt9xo2LPD5ZDaKE3eteV",
    "drivers-jobs-online-simulator": "/?mod=3aurnrdnBWV8JUy1PlRk",
    "truck-simulator-bigrigs":       "/?mod=LwoLXfJV5dYt96ipaSYB",
    "universal-truck-simulator":     "/?mod=GsL7ow00nHxijoDVMkWe",
    "off-the-road":                  "/?mod=sHBaQ4jxKB7AQhsjPsLJ",
    "trucker-of-europe-3":           "/?mod=2",
    "rally-fury":                    "/?mod=IM35lDbfpmOvxzQFxOfm",
    "grand-truck-simulator-2":       "/?mod=UWiGr3eqIn4akkc2r6Va",
    "subway-surfers":                "/?mod=6Cl6XJzYJVTVfoum82Tu",
    "hill-climb-racing":             "/?mod=BoNn6QyU5GHvEXWthbsy",
    "hungry-shark-world":            "/?mod=LC7P1fxJX3MRMY0g1QB0"
  };

  var path = (window.location.pathname || "");

  // 1) Old physical mod page: /mods/slug.html  or  /es/mods/slug.html (+8 langs)
  var mm = path.match(/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?mods\/([^\/]+?)\.html$/i);
  if (mm) {
    var slug = decodeURIComponent(mm[1]).toLowerCase();
    var dest = MAP[slug] || "/";
    window.location.replace(dest);
    return true;
  }

  // 2) Old listing: /mods or /mods/ (+ language prefixes)
  if (/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?mods\/?$/i.test(path)) {
    window.location.replace("/");
    return true;
  }

  // 3) Any other leftover .html (except the SPA shell) -> home
  if (/\.html$/i.test(path) && !/\/(?:index)?\.html$/i.test(path) && path !== "/index.html") {
    window.location.replace("/");
    return true;
  }
  return false;
})();

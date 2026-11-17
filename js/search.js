/* OSM — Buscador instantáneo. Overlay con filtrado en vivo sobre los productos
   de OSM_DATA (modelo, nombre, categoría, serie, fuerza). Sin dependencias. */
(function () {
  "use strict";

  function uiT(key, fb) { try { return window.OSM_I18N.t(key); } catch (e) { return fb; } }
  function curLang() { try { return window.OSM_I18N.current(); } catch (e) { return "es"; } }
  function dt(val, lang) { try { return window.OSM_DATA.t(val, lang); } catch (e) { return (val && val.es) || val || ""; } }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function buildIndex() {
    var D = window.OSM_DATA;
    if (!D) return [];
    var lang = curLang();
    return D.products.map(function (p) {
      var cat = D.getCategory(p.category);
      var serie = (p.series && cat && cat.series) ? cat.series.filter(function (s) { return s.slug === p.series; })[0] : null;
      var catName = cat ? dt(cat.name, lang) : "";
      var serieName = serie ? dt(serie.name, lang) : "";
      var force = "";
      var sf = (p.specs || []).filter(function (s) { return s.label && s.label.en === "Nominal force"; })[0];
      if (sf) force = dt(sf.value, lang);
      var tagline = dt(p.tagline, lang);
      var serieTag = serie ? dt(serie.tagline, lang) : "";
      var hay = [p.model, p.name, catName, serieName, serieTag, tagline, p.category, p.series || "", force].join(" ").toLowerCase();
      return { p: p, catName: catName, serieName: serieName, force: force, hay: hay };
    });
  }

  var overlay = null, input = null, resultsEl = null, index = [];

  function render(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) { resultsEl.innerHTML = ""; return; }
    var terms = q.split(/\s+/);
    var matches = index.filter(function (it) {
      return terms.every(function (tm) { return it.hay.indexOf(tm) > -1; });
    }).slice(0, 12);
    if (!matches.length) {
      resultsEl.innerHTML = '<div class="search-empty">' + esc(uiT("searchNoResults", "Sin resultados")) + "</div>";
      return;
    }
    resultsEl.innerHTML = matches.map(function (it) {
      var sub = [it.catName, it.serieName, it.force].filter(Boolean).join(" · ");
      return '<a class="search-item" href="producto.html?id=' + esc(it.p.id) + '">' +
        '<span class="search-item-name">' + esc(it.p.model) + "</span>" +
        '<span class="search-item-sub">' + esc(sub) + "</span></a>";
    }).join("");
  }

  function open() {
    if (overlay) return;
    index = buildIndex();
    overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.innerHTML = '<div class="search-box"><div class="search-field">' +
      '<span class="search-ico-lg" aria-hidden="true"></span>' +
      '<input type="search" class="search-input" placeholder="' + esc(uiT("searchPlaceholder", "Buscar…")) +
      '" aria-label="' + esc(uiT("searchTitle", "Buscar")) + '">' +
      '<button type="button" class="search-close" aria-label="Cerrar">&times;</button></div>' +
      '<div class="search-results"></div></div>';
    document.body.appendChild(overlay);
    document.body.classList.add("cmp-lock");
    input = overlay.querySelector(".search-input");
    resultsEl = overlay.querySelector(".search-results");
    input.addEventListener("input", function () { render(input.value); });
    requestAnimationFrame(function () { overlay.classList.add("open"); input.focus(); });
  }
  function close() {
    if (!overlay) return;
    var o = overlay; overlay = null;
    o.classList.remove("open");
    document.body.classList.remove("cmp-lock");
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 200);
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-search-open]")) { e.preventDefault(); open(); return; }
    if (e.target.closest(".search-close")) { close(); return; }
    if (overlay && e.target === overlay) { close(); return; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay) close(); });
})();

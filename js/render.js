/* OSM — Render de páginas de catálogo (categoría) y ficha de producto.
   Lee OSM_DATA + parámetros de URL + idioma actual (OSM_I18N) y re-renderiza
   cuando cambia el idioma (evento "osm:lang"). Sin dependencias. */
(function () {
  "use strict";

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- Gráfico comparativo (modal con barras) ----
  function cmpParseNum(s) {
    var t = String(s).replace(/[–—]/g, "-").replace(",", ".");
    var m = t.match(/-?\d+(?:\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  // Unidad = lo que queda después del último número de un valor (ej. "350 kN" -> "kN").
  function cmpUnit(values) {
    for (var k = 0; k < values.length; k++) {
      var v = String(values[k]).replace(/[–—]/g, "-");
      var all = v.match(/-?\d+(?:[.,]\d+)?/g);
      if (all && all.length) {
        var last = all[all.length - 1];
        var unit = v.slice(v.lastIndexOf(last) + last.length).trim();
        if (unit) return unit;
      }
    }
    return "";
  }
  // Mini-análisis por parámetro (clave = label en inglés). Reusa textos por grupo.
  var SI_DAYLIGHT = { es: "Es la altura libre entre la mesa y el pisón con la máquina abierta. Una mayor apertura facilita la carga de chapa y el cambio de matrices.", pt: "É a altura livre entre a mesa e o martelo com a máquina aberta. Uma abertura maior facilita o carregamento de chapa e a troca de matrizes.", en: "The clear height between bed and ram with the machine open. A larger opening eases sheet loading and die changes." };
  var SPEC_INFO = {
    "Nominal force": { es: "Indica la fuerza máxima de plegado de la máquina. A mayor valor, permite conformar chapa de mayor espesor y longitud.", pt: "Indica a força máxima de dobra da máquina. Quanto maior o valor, permite conformar chapa de maior espessura e comprimento.", en: "Indicates the machine's maximum bending force. A higher value forms thicker and longer sheet metal." },
    "Workbench": { es: "Corresponde al ancho de la mesa de trabajo. Un mayor ancho ofrece más superficie de apoyo para piezas de gran formato.", pt: "Corresponde à largura da mesa de trabalho. Uma largura maior oferece mais superfície de apoio para peças de grande formato.", en: "Corresponds to the worktable width. A greater width provides more support surface for large-format parts." },
    "Bending length": { es: "Define la longitud máxima de plegado en una sola operación. Un valor más alto permite trabajar piezas largas sin dividir el doblez.", pt: "Define o comprimento máximo de dobra numa única operação. Um valor maior permite trabalhar peças longas sem dividir a dobra.", en: "Defines the maximum bending length in a single operation. A higher value handles long parts without splitting the fold." },
    "Column distance": { es: "Es la distancia libre entre los montantes laterales. Una mayor distancia facilita el plegado de piezas anchas o en forma de U.", pt: "É a distância livre entre os montantes laterais. Uma distância maior facilita a dobra de peças largas ou em forma de U.", en: "The clear distance between the side uprights. A greater distance eases bending of wide or U-shaped parts." },
    "Stroke distance": { es: "Representa el recorrido vertical del pisón en cada ciclo. Una carrera mayor facilita la extracción de piezas altas o con pliegues profundos.", pt: "Representa o curso vertical do martelo em cada ciclo. Um curso maior facilita a retirada de peças altas ou com dobras profundas.", en: "Represents the ram's vertical travel per cycle. A longer stroke eases removal of tall parts or deep bends." },
    "Max. daylight": SI_DAYLIGHT, "Daylight": SI_DAYLIGHT,
    "Approach speed": { es: "Es la velocidad con que el pisón desciende hasta la chapa. Una mayor velocidad reduce los tiempos previos a cada plegado.", pt: "É a velocidade com que o martelo desce até a chapa. Uma velocidade maior reduz os tempos anteriores a cada dobra.", en: "The speed at which the ram descends to the sheet. A higher speed reduces the idle time before each bend." },
    "Bending speed": { es: "Corresponde a la velocidad durante el plegado. Un valor adecuado combina productividad con precisión en el ángulo obtenido.", pt: "Corresponde à velocidade durante a dobra. Um valor adequado combina produtividade com precisão no ângulo obtido.", en: "Corresponds to the speed during bending. A suitable value combines productivity with accuracy in the resulting angle." },
    "Return speed": { es: "Indica la velocidad de retorno del pisón tras el plegado. Un valor mayor acorta el tiempo entre piezas en producciones extensas.", pt: "Indica a velocidade de retorno do martelo após a dobra. Um valor maior encurta o tempo entre peças em produções extensas.", en: "Indicates the ram's return speed after bending. A higher value shortens the time between parts in long runs." },
    "Dimensions – Length": { es: "Corresponde al largo total del equipo. Es la primera medida a considerar para su ubicación dentro de la línea de producción.", pt: "Corresponde ao comprimento total do equipamento. É a primeira medida a considerar para sua localização na linha de produção.", en: "Corresponds to the equipment's total length. The first dimension to consider for placement within the production line." },
    "Dimensions – Width": { es: "Corresponde al fondo del equipo. Permite calcular los pasillos, el espacio del operario y la circulación alrededor de la máquina.", pt: "Corresponde à profundidade do equipamento. Permite calcular os corredores, o espaço do operador e a circulação ao redor da máquina.", en: "Corresponds to the equipment's depth. Lets you plan aisles, operator space and movement around the machine." },
    "Dimensions – Height": { es: "Corresponde a la altura total del equipo. Conviene contrastarla con las aberturas, el portón de descarga y la altura del taller.", pt: "Corresponde à altura total do equipamento. Convém compará-la com as aberturas, o portão de descarga e o pé-direito da oficina.", en: "Corresponds to the equipment's total height. Worth comparing against doorways, the unloading gate and the workshop height." },
    "Main motor power": { es: "Indica la potencia del motor principal. Refleja la capacidad de accionamiento disponible y el consumo en pleno funcionamiento.", pt: "Indica a potência do motor principal. Reflete a capacidade de acionamento disponível e o consumo em pleno funcionamento.", en: "Indicates the main motor's power. Reflects the available drive capacity and the consumption at full operation." },
    "Single motor power": { es: "Corresponde a la potencia de cada servomotor. En las máquinas eléctricas determina la capacidad de accionamiento de cada eje.", pt: "Corresponde à potência de cada servomotor. Nas máquinas elétricas determina a capacidade de acionamento de cada eixo.", en: "Corresponds to each servo motor's power. On electric machines it determines each axis's drive capacity." },
    "Total power": { es: "Representa el consumo total del equipo en funcionamiento. Es el dato de referencia para dimensionar la instalación eléctrica.", pt: "Representa o consumo total do equipamento em funcionamento. É o dado de referência para dimensionar a instalação elétrica.", en: "Represents the equipment's total consumption in operation. The reference figure for sizing the electrical installation." },
    "Total capacity": { es: "Indica la capacidad eléctrica total requerida por el equipo. Permite prever el tablero, el cableado y la conexión a la red.", pt: "Indica a capacidade elétrica total exigida pelo equipamento. Permite prever o quadro, o cabeamento e a ligação à rede.", en: "Indicates the total electrical capacity required by the equipment. Lets you plan the panel, wiring and grid connection." },
    "Power supply cable": { es: "Corresponde a la sección del cable de alimentación requerida. Es un dato de instalación a considerar en la conexión eléctrica.", pt: "Corresponde à bitola do cabo de alimentação requerida. É um dado de instalação a considerar na ligação elétrica.", en: "Corresponds to the required power supply cable gauge. An installation figure to consider for the electrical connection." },
    "Gross weight (approx.)": { es: "Indica el peso total de la máquina. Refleja la robustez de su estructura y aporta estabilidad y rigidez durante el plegado.", pt: "Indica o peso total da máquina. Reflete a robustez de sua estrutura e contribui para a estabilidade e rigidez durante a dobra.", en: "Indicates the machine's total weight. Reflects its structural robustness and adds stability and rigidity while bending." }
  };

  var ICON_PHONE = '<svg class="sheet-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var ICON_MAIL = '<svg class="sheet-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>';
  var ICON_IG = '<svg class="sheet-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';

  function closeModalEl(m) {
    if (!m) return;
    m.classList.remove("open");
    setTimeout(function () {
      if (m.parentNode) m.parentNode.removeChild(m);
      if (!document.querySelector(".cmp-modal, .compare-modal")) document.body.classList.remove("cmp-lock");
    }, 220);
  }
  function closeCmpChart() { closeModalEl(document.querySelector(".cmp-modal")); }
  function openCmpChart(row) {
    var table = row.closest("table");
    if (!table) return;
    var heads = table.querySelectorAll("thead th");
    var names = [];
    for (var i = 1; i < heads.length; i++) names.push(heads[i].textContent.trim());
    var cells = row.children;
    var label = cells[0].textContent.trim();
    var data = [];
    for (var j = 1; j < cells.length; j++) {
      var val = cells[j].textContent.trim();
      data.push({ name: names[j - 1] || "", val: val, num: cmpParseNum(val) });
    }
    var nums = data.filter(function (d) { return d.num != null; }).map(function (d) { return d.num; });
    var max = nums.length ? Math.max.apply(null, nums) : 0;
    var unit = cmpUnit(data.map(function (d) { return d.val; }));
    var key = row.getAttribute("data-spec") || "";
    var lng = (window.OSM_I18N && window.OSM_I18N.current) ? window.OSM_I18N.current() : "es";
    var info = SPEC_INFO[key];
    var descHtml = info ? '<p class="cmp-modal-desc">' + esc(info[lng] || info.es) + "</p>" : "";
    data.sort(function (a, b) { return (b.num == null ? -Infinity : b.num) - (a.num == null ? -Infinity : a.num); });
    var bars = data.map(function (d) {
      var pct = (max > 0 && d.num != null) ? Math.max(3, d.num / max * 100) : 0;
      return '<div class="cmp-bar-row"><span class="cmp-bar-name">' + esc(d.name) + "</span>" +
        '<div class="cmp-bar-track"><div class="cmp-bar-fill" style="width:' + pct.toFixed(1) + '%"></div></div>' +
        '<span class="cmp-bar-val">' + esc(d.val) + "</span></div>";
    }).join("");
    closeCmpChart();
    var modal = document.createElement("div");
    modal.className = "cmp-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", label);
    modal.innerHTML = '<div class="cmp-modal-box"><button type="button" class="cmp-close" aria-label="Cerrar">&times;</button>' +
      '<div class="cmp-modal-head"><span class="kicker-bar"></span><div><h3>' + esc(label) + "</h3>" +
      (unit ? '<span class="cmp-modal-unit">' + esc(unit) + "</span>" : "") + "</div></div>" +
      descHtml +
      '<div class="cmp-bars">' + bars + "</div></div>";
    document.body.appendChild(modal);
    document.body.classList.add("cmp-lock");
    requestAnimationFrame(function () { modal.classList.add("open"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.OSM_DATA, I = window.OSM_I18N;
    if (!D || !I) return;

    var catPage = document.getElementById("cat-page");
    var prodPage = document.getElementById("prod-page");

    function lang() { return I.current(); }
    function t(v) { return D.t(v, lang()); }
    function ui(k) { return I.t(k); }

    function contactLinks(p) {
      var msg = ui("waMsg").replace("{p}", p ? p.name : "OSM");
      var subject = encodeURIComponent((p ? p.name + " — " : "") + "OSM Argentina/Brasil");
      return D.contact.countries.map(function (c) {
        return {
          label: c.label,
          code: c.code,
          wa: "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(msg),
          waDisplay: c.whatsappDisplay,
          mail: "https://mail.google.com/mail/?view=cm&fs=1&to=" + c.email + "&su=" + subject,
          email: c.email,
          ig: c.instagram
        };
      });
    }

    // Canal de contacto dividido (mitad Brasil / mitad Argentina), igual que en la seccion de contacto.
    function ctaChannel(links, title, hrefKey) {
      return '<div class="cchan"><div class="cchan-head"><span class="cchan-bar"></span>' + esc(title) + "</div>" +
        '<div class="cchan-split">' +
        links.map(function (l) {
          return '<a class="cchan-half cchan-half-' + (l.code === "ar" ? "ar" : "br") + '" href="' + esc(l[hrefKey]) +
            '" target="_blank" rel="noopener"><span class="cchan-co">' + esc(ui("inquireSupport")) +
            '</span><span class="cchan-val">' + esc(l.label) + "</span></a>";
        }).join("") + "</div></div>";
    }

    // ---- SEO dinámico: Open Graph + JSON-LD ----
    function absUrl(path) { try { return new URL(path, location.href).href; } catch (e) { return path; } }
    function setMeta(attr, key, content) {
      var el = document.head.querySelector("meta[" + attr + '="' + key + '"]');
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", content);
    }
    function setOG(o) {
      if (o.title) { setMeta("property", "og:title", o.title); setMeta("name", "twitter:title", o.title); document.title = o.title; }
      if (o.desc) { setMeta("property", "og:description", o.desc); setMeta("name", "twitter:description", o.desc); setMeta("name", "description", o.desc); }
      if (o.image) { var u = absUrl(o.image); setMeta("property", "og:image", u); setMeta("name", "twitter:image", u); }
      setMeta("property", "og:url", location.href);
      setMeta("property", "og:type", o.type || "website");
    }
    function setJsonLd(id, obj) {
      var old = document.getElementById(id);
      if (old) old.remove();
      var s = document.createElement("script");
      s.type = "application/ld+json"; s.id = id; s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    }
    function crumbList(items) {
      return {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: items.map(function (it, i) {
          return { "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.url) };
        })
      };
    }
    function itemList(name, items) {
      return {
        "@context": "https://schema.org", "@type": "ItemList", name: name,
        itemListElement: items.map(function (it, i) {
          return { "@type": "ListItem", position: i + 1, name: it.name, url: absUrl(it.url) };
        })
      };
    }

    // Tarjeta reutilizable (series y productos). Las de producto suman botón "Comparar".
    function cardHTML(href, topLabel, img, title, desc, ctaLabel) {
      var pid = (href.match(/producto\.html\?id=([^&"]+)/) || [])[1];
      var cmpBtn = pid ? '<button type="button" class="cmp-add' + (isCompared(pid) ? " on" : "") +
        '" data-id="' + esc(pid) + '" aria-label="' + esc(ui("cmpAdd")) + '" title="' + esc(ui("cmpAdd")) +
        '"><span class="cmp-add-ico"></span></button>' : "";
      return '<a class="cat-card" href="' + esc(href) + '">' +
        '<div class="cat-top"><span class="cat-num">' + esc(topLabel) + '</span>' +
        (cmpBtn || '<span class="hatch hatch-sm"></span>') + '</div>' +
        '<div class="cat-img"><img src="' + esc(img) + '" alt="' + esc(title) + '" loading="lazy" decoding="async" width="600" height="400"></div>' +
        '<div class="cat-body"><h3>' + esc(title) + "</h3><p>" + esc(desc) + "</p>" +
        '<span class="tag-dark">' + esc(ctaLabel) + "</span></div></a>";
    }

    function cmpHintHTML() {
      return '<p class="cmp-hint"><span class="cmp-hint-ico" aria-hidden="true"></span>' + esc(ui("cmpHint")) + "</p>";
    }

    // ---- Estado del comparador libre (persistente) ----
    var COMPARE_KEY = "osm_compare", COMPARE_MAX = 4;
    var compareState = (function () { try { return JSON.parse(localStorage.getItem(COMPARE_KEY)) || []; } catch (e) { return []; } })();
    function saveCompare() { try { localStorage.setItem(COMPARE_KEY, JSON.stringify(compareState)); } catch (e) {} }
    function isCompared(id) { return compareState.indexOf(id) > -1; }
    function toggleCompare(id) {
      var i = compareState.indexOf(id);
      if (i > -1) compareState.splice(i, 1);
      else { if (compareState.length >= COMPARE_MAX) return false; compareState.push(id); }
      saveCompare(); return true;
    }
    function markComparedCards() {
      var btns = document.querySelectorAll(".cmp-add");
      for (var i = 0; i < btns.length; i++) btns[i].classList.toggle("on", isCompared(btns[i].getAttribute("data-id")));
    }
    function updateCompareBar() {
      var bar = document.getElementById("cmp-bar");
      if (!compareState.length) { if (bar) bar.parentNode.removeChild(bar); return; }
      if (!bar) { bar = document.createElement("div"); bar.id = "cmp-bar"; document.body.appendChild(bar); }
      bar.innerHTML = '<span class="cmp-bar-count">' + esc(ui("cmpBar")) + ': <b>' + compareState.length + "</b></span>" +
        '<button type="button" class="btn btn-red cmp-bar-open"' + (compareState.length < 2 ? " disabled" : "") + ">" + esc(ui("cmpOpen")) + "</button>" +
        '<button type="button" class="cmp-bar-clear">' + esc(ui("cmpClear")) + "</button>";
    }
    function openComparator() {
      if (compareState.length < 2) return;
      var prods = compareState.map(function (id) { return D.getProduct(id); }).filter(Boolean);
      var order = [], byKey = {};
      prods.forEach(function (p) {
        (p.specs || []).forEach(function (s) { var k = s.label.en; if (!(k in byKey)) { byKey[k] = s.label; order.push(k); } });
      });
      var head = '<th class="cmp-corner"></th>' + prods.map(function (p) {
        return '<th><a href="producto.html?id=' + esc(p.id) + '">' + esc(p.model) + "</a></th>";
      }).join("");
      var rows = order.map(function (k) {
        var vals = prods.map(function (p) {
          var s = (p.specs || []).filter(function (x) { return x.label.en === k; })[0];
          return s ? t(s.value) : "—";
        });
        var nums = vals.map(cmpParseNum).filter(function (n) { return n != null; });
        var distinct = {}; nums.forEach(function (n) { distinct[n] = 1; });
        var hasPlus = vals.some(function (v) { return v.indexOf("+") > -1; });
        var chartable = nums.length >= 2 && Object.keys(distinct).length >= 2 && !hasPlus;
        var attrs = chartable ? ' class="cmp-row" tabindex="0" role="button" data-spec="' + esc(k) + '"' : "";
        var ico = chartable ? '<span class="cmp-row-ico" aria-hidden="true"></span>' : "";
        return "<tr" + attrs + "><th>" + esc(t(byKey[k])) + ico + "</th>" +
          vals.map(function (v) { return "<td>" + esc(v) + "</td>"; }).join("") + "</tr>";
      }).join("");
      var modal = document.createElement("div");
      modal.className = "compare-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = '<div class="compare-modal-box"><button type="button" class="cmp-close" aria-label="Cerrar">&times;</button>' +
        '<div class="cmp-modal-head"><span class="kicker-bar"></span><h3>' + esc(ui("cmpModalTitle")) + "</h3></div>" +
        '<div class="table-scroll"><table class="compare-table"><thead><tr>' + head +
        "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
      document.body.appendChild(modal);
      document.body.classList.add("cmp-lock");
      requestAnimationFrame(function () { modal.classList.add("open"); });
    }

    // ---- Ficha técnica descargable (vista previa + Guardar PDF) ----
    function sheetFeatures(p) {
      if (p.featureBlocks && p.featureBlocks.length) return p.featureBlocks.map(function (b) { return t(b.title); });
      if (p.features && p.features.length) return p.features.map(function (f) { return t(f); });
      return [];
    }
    function closeSheet() {
      var m = document.querySelector(".sheet-modal");
      if (!m) return;
      m.classList.remove("open");
      document.body.classList.remove("cmp-lock");
      setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, 200);
    }
    function openDatasheet(p) {
      if (!p) return;
      var cat = D.getCategory(p.category);
      var serie = (p.series && cat && cat.series) ? cat.series.filter(function (s) { return s.slug === p.series; })[0] : null;
      var crumb = [cat ? t(cat.name) : "", serie ? t(serie.name) : ""].filter(Boolean).join(" · ");
      var specRows = (p.specs || []).map(function (s) {
        return "<tr><th>" + esc(t(s.label)) + "</th><td>" + esc(t(s.value)) + "</td></tr>";
      }).join("");
      var descArr = p.description ? (t(p.description) || []) : [];
      var descHtml = descArr.length ? '<div class="sheet-desc"><div class="sheet-h">' + esc(ui("descTitle")) +
        '</div><p>' + esc(descArr[0]) + "</p></div>" : "";
      var feats = sheetFeatures(p);
      var featHtml = feats.length ? '<div class="sheet-feats"><div class="sheet-h">' + esc(ui("featuresTitle")) +
        '</div><ul class="sheet-feat-list">' + feats.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></div>" : "";
      var contact = '<div class="sheet-contacts">' +
        D.contact.countries.map(function (c) {
          return '<span class="sheet-contact">' + ICON_PHONE + esc(c.label + " " + c.whatsappDisplay) + "</span>" +
            '<a class="sheet-contact" href="https://mail.google.com/mail/?view=cm&fs=1&to=' + esc(c.email) +
              "&su=" + encodeURIComponent(p.name + " — OSM Argentina/Brasil") + '" target="_blank" rel="noopener">' +
              ICON_MAIL + esc(c.email) + "</a>" +
            '<a class="sheet-contact" href="' + esc(c.instagram) + '" target="_blank" rel="noopener">' + ICON_IG + esc(c.instagramHandle) + "</a>";
        }).join("") + "</div>";
      var sheet = '<div class="sheet-modal"><div class="sheet-toolbar">' +
        '<button type="button" class="btn btn-red sheet-save">' + esc(ui("sheetSave")) + "</button>" +
        '<button type="button" class="sheet-close-btn">' + esc(ui("sheetClose")) + "</button></div>" +
        '<div class="sheet-scroll"><article class="sheet-doc">' +
        '<header class="sheet-head"><div class="sheet-brand"><img class="sheet-logo" src="assets/logo.png" alt="OSM Argentina/Brasil">' +
        '<span class="sheet-brand-txt"><small>ARGENTINA · BRASIL</small></span></div>' +
        '<span class="sheet-label">' + esc(ui("sheetLabel")) + "</span></header>" +
        '<div class="sheet-title">' + (crumb ? '<div class="sheet-crumb">' + esc(crumb) + "</div>" : "") +
        '<span class="sheet-model">' + esc(p.model) + "</span>" +
        "<h1>" + esc(p.name) + "</h1><p>" + esc(t(p.tagline)) + "</p></div>" +
        '<div class="sheet-body"><div class="sheet-col-left"><div class="sheet-img"><img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '"></div>' +
        descHtml + "</div>" +
        '<div class="sheet-specs-wrap"><div class="sheet-h">' + esc(ui("specsTitle")) + "</div>" +
        '<table class="sheet-specs"><tbody>' + specRows + "</tbody></table></div></div>" +
        featHtml +
        '<footer class="sheet-foot">' + contact +
        '<div class="sheet-foot-brand">OSM Argentina/Brasil · Distribuidor OSM CNC para Argentina y Brasil</div></footer>' +
        "</article></div></div>";
      closeSheet();
      var wrap = document.createElement("div");
      wrap.innerHTML = sheet;
      var modal = wrap.firstChild;
      document.body.appendChild(modal);
      document.body.classList.add("cmp-lock");
      requestAnimationFrame(function () { modal.classList.add("open"); });
    }

    // ---- Calculadora de tonelaje ----
    function calculatorHTML() {
      return '<section class="series-sec series-sec-alt calc-collapse" data-reveal><div class="container">' +
        '<button type="button" class="calc-toggle" aria-expanded="false"><span class="calc-toggle-text">' +
        '<span class="hatch"></span><span class="calc-toggle-title">' + esc(ui("calcTitle")) + "</span></span>" +
        '<span class="calc-chevron" aria-hidden="true"></span></button>' +
        '<div class="calc-panel"><div class="calc-panel-inner">' +
        '<p class="calc-intro">' + esc(ui("calcIntro")) + "</p>" +
        '<div class="calc"><div class="calc-form">' +
        '<label class="calc-field"><span>' + esc(ui("calcMaterial")) + '</span><select id="calc-mat">' +
        '<option value="450">' + esc(ui("matMild")) + "</option>" +
        '<option value="650">' + esc(ui("matStainless")) + "</option>" +
        '<option value="290">' + esc(ui("matAlu")) + "</option></select></label>" +
        '<label class="calc-field"><span>' + esc(ui("calcThk")) + '</span><input id="calc-thk" type="number" min="0.5" step="0.1" value="2"></label>' +
        '<label class="calc-field"><span>' + esc(ui("calcLen")) + '</span><input id="calc-len" type="number" min="100" step="50" value="1000"></label>' +
        '<button type="button" class="btn btn-red calc-btn">' + esc(ui("calcBtn")) + "</button></div>" +
        '<div class="calc-result" id="calc-result"><p class="calc-hint">' + esc(ui("calcFill")) + "</p></div></div>" +
        '<p class="calc-note">' + esc(ui("calcNote")) + "</p>" +
        "</div></div></div></section>";
    }
    function computeTonnage() {
      var matEl = document.getElementById("calc-mat"), thkEl = document.getElementById("calc-thk"), lenEl = document.getElementById("calc-len");
      var out = document.getElementById("calc-result");
      if (!out) return;
      var Rm = matEl ? parseFloat(matEl.value) || 450 : 450;
      var thk = thkEl ? parseFloat(thkEl.value) : NaN;
      var len = lenEl ? parseFloat(lenEl.value) : NaN;
      if (!(thk > 0) || !(len > 0)) { out.innerHTML = '<p class="calc-hint">' + esc(ui("calcFill")) + "</p>"; return; }
      var V = 8 * thk;
      var Fkn = Math.ceil((1.33 * Rm * thk * thk * len) / (V * 1000));
      var pbs = D.productsByCategory("cnc-press-brake");
      var matches = pbs.map(function (p) {
        var sf = (p.specs || []).filter(function (s) { return s.label.en === "Nominal force"; })[0];
        return { p: p, f: sf ? cmpParseNum(t(sf.value)) : null };
      }).filter(function (m) { return m.f != null && m.f >= Fkn; }).sort(function (a, b) { return a.f - b.f; });
      var list = matches.slice(0, 9).map(function (m) {
        return '<a class="calc-model" href="producto.html?id=' + esc(m.p.id) + '"><span>' + esc(m.p.model) + "</span><b>" + m.f + " kN</b></a>";
      }).join("");
      out.innerHTML = '<div class="calc-req"><span class="calc-req-label">' + esc(ui("calcReq")) + '</span><span class="calc-req-val">' + Fkn + " kN</span>" +
        '<span class="calc-vdie">' + esc(ui("calcVdie")) + ": V" + Math.round(V) + "</span></div>" +
        '<div class="calc-models-head">' + esc(ui("calcModels")) + "</div>" +
        (list ? '<div class="calc-models">' + list + "</div>" : '<p class="calc-hint">' + esc(ui("calcNone")) + "</p>");
    }
    // Tabla comparativa de los modelos de una serie (specs lado a lado).
    function comparisonTableHTML(prods) {
      if (!prods.length || !prods[0].specs || !prods[0].specs.length) return "";
      var labels = prods[0].specs;
      var head = '<th class="cmp-corner"></th>' + prods.map(function (p) {
        return '<th><a href="producto.html?id=' + esc(p.id) + '">' + esc(p.model) + "</a></th>";
      }).join("");
      var rows = labels.map(function (lab, i) {
        var vals = prods.map(function (p) { var s = p.specs[i]; return s ? t(s.value) : "—"; });
        var nums = vals.map(cmpParseNum).filter(function (n) { return n != null; });
        var distinct = {}; nums.forEach(function (n) { distinct[n] = 1; });
        var hasPlus = vals.some(function (v) { return v.indexOf("+") > -1; });
        // Comparable solo si hay ≥2 valores numéricos, distintos entre sí y sin formato compuesto (ej. "4+1").
        var chartable = nums.length >= 2 && Object.keys(distinct).length >= 2 && !hasPlus;
        var attrs = chartable ? ' class="cmp-row" tabindex="0" role="button" aria-label="' + esc(t(lab.label)) + '" data-spec="' + esc(lab.label.en) + '"' : "";
        var ico = chartable ? '<span class="cmp-row-ico" aria-hidden="true"></span>' : "";
        return "<tr" + attrs + "><th>" + esc(t(lab.label)) + ico + "</th>" +
          vals.map(function (v) { return "<td>" + esc(v) + "</td>"; }).join("") + "</tr>";
      }).join("");
      return '<section class="series-sec series-sec-alt" data-reveal><div class="container">' +
        secHead(ui("compareTitle")) +
        '<div class="table-scroll"><table class="compare-table"><thead><tr>' + head +
        "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
        (prods.length >= 2 ? cmpHintHTML() : "") + "</div></section>";
    }

    // Secciones de serie (contenido compartido con imágenes).
    function secHead(title) {
      return '<div class="section-head"><span class="hatch"></span><div><h2>' + esc(title) + "</h2></div></div>";
    }
    function seriesSectionsHTML(sections) {
      return sections.map(function (sec) {
        if (sec.type === "mediaGrid") {
          return '<section class="series-sec" data-reveal><div class="container">' + secHead(t(sec.title)) +
            '<div class="media-grid" data-stagger>' + sec.items.map(function (it) {
              return '<div class="media-card"><div class="media-img"><img src="' + esc(it.image) +
                '" alt="' + esc(t(it.title)) + '" loading="lazy"></div>' +
                "<h3>" + esc(t(it.title)) + "</h3><p>" + esc(t(it.text)) + "</p></div>";
            }).join("") + "</div></div></section>";
        }
        if (sec.type === "bullets") {
          return '<section class="series-sec series-sec-alt" data-reveal><div class="container">' + secHead(t(sec.title)) +
            '<div class="bullets-grid"><div class="bullets-col"><h3>' + esc(t(sec.subtitle)) + "</h3>" +
            (sec.text ? '<p class="bullets-intro">' + esc(t(sec.text)) + "</p>" : "") +
            '<ul class="bullet-list">' + sec.items.map(function (b) { return "<li>" + esc(t(b)) + "</li>"; }).join("") +
            '</ul></div><figure class="image-fig"><img src="' + esc(sec.image) + '" alt="' + esc(t(sec.subtitle)) + '" loading="lazy">' +
            (sec.caption ? "<figcaption>" + esc(t(sec.caption)) + "</figcaption>" : "") + "</figure></div></div></section>";
        }
        if (sec.type === "image") {
          return '<section class="series-sec" data-reveal><div class="container">' + secHead(t(sec.title)) +
            '<figure class="image-fig image-fig-wide"><img src="' + esc(sec.image) + '" alt="' + esc(t(sec.title)) + '" loading="lazy">' +
            (sec.caption ? "<figcaption>" + esc(t(sec.caption)) + "</figcaption>" : "") + "</figure></div></section>";
        }
        if (sec.type === "drawing") {
          return '<section class="series-sec series-sec-alt" data-reveal><div class="container">' + secHead(t(sec.title)) +
            '<div class="drawing-grid"><figure class="image-fig"><img src="' + esc(sec.image) + '" alt="' + esc(t(sec.title)) + '" loading="lazy"></figure>' +
            '<div class="dim-wrap"><h3>' + esc(t(sec.tableTitle)) + '</h3><div class="table-scroll"><table class="dim-table"><thead><tr>' +
            sec.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
            sec.rows.map(function (r) {
              return "<tr>" + r.map(function (cell, i) { return i === 0 ? "<th>" + esc(cell) + "</th>" : "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>";
            }).join("") + "</tbody></table></div></div></div></div></section>";
        }
        return "";
      }).join("");
    }

    function headHTML(crumbsInner, tagline, title, intro) {
      return '<nav class="crumbs">' + crumbsInner + "</nav>" +
        '<div class="kicker"><span class="kicker-bar"></span><span>' + esc(tagline) + "</span></div>" +
        "<h1>" + esc(title) + "</h1>" +
        '<p class="page-intro">' + esc(intro) + "</p>";
    }

    /* ---------------- Página de CATEGORÍA / SERIE ---------------- */
    function renderCategory() {
      var slug = qs("cat");
      var serieSlug = qs("serie");
      var cat = D.getCategory(slug);
      var head = document.getElementById("cat-head");
      var grid = document.getElementById("products-grid");
      var sectionsEl = document.getElementById("series-sections");
      if (sectionsEl) sectionsEl.innerHTML = "";
      var extraEl = document.getElementById("cat-extra");
      if (extraEl) extraEl.innerHTML = "";
      if (!cat) {
        if (head) head.innerHTML = "";
        if (grid) grid.innerHTML = '<p class="empty">' + esc(ui("notFound")) + "</p>";
        document.title = "OSM — " + ui("notFound");
        return;
      }
      var homeCrumb = '<a href="index.html">' + esc(ui("crumbHome")) + "</a>";

      // Caso A: categoría con series, sin serie elegida → listar las series.
      if (cat.series && !serieSlug) {
        document.title = t(cat.name) + " — OSM Argentina/Brasil";
        head.innerHTML = headHTML(homeCrumb + '<span>/</span><span>' + esc(t(cat.name)) + "</span>",
          t(cat.tagline), t(cat.name), t(cat.intro));
        if (extraEl) extraEl.innerHTML = calculatorHTML();
        grid.innerHTML = cat.series.map(function (s) {
          return cardHTML("categoria.html?cat=" + slug + "&serie=" + s.slug,
            s.slug.toUpperCase(), s.image, t(s.name), t(s.tagline), ui("viewSeriesCta"));
        }).join("");
        setOG({ title: t(cat.name) + " — OSM Argentina/Brasil", desc: t(cat.intro), image: cat.image });
        setJsonLd("ld-breadcrumb", crumbList([{ name: ui("crumbHome"), url: "index.html" }, { name: t(cat.name), url: "categoria.html?cat=" + slug }]));
        setJsonLd("ld-itemlist", itemList(t(cat.name), cat.series.map(function (s) { return { name: t(s.name), url: "categoria.html?cat=" + slug + "&serie=" + s.slug }; })));
        return;
      }

      // Caso B: serie elegida → máquinas de esa serie.
      if (cat.series && serieSlug) {
        var serie = D.getSeries(slug, serieSlug);
        if (!serie) {
          head.innerHTML = headHTML(homeCrumb, "", t(cat.name), "");
          grid.innerHTML = '<p class="empty">' + esc(ui("notFound")) + "</p>";
          return;
        }
        document.title = t(serie.name) + " — " + t(cat.name) + " — OSM Argentina/Brasil";
        head.innerHTML = headHTML(
          homeCrumb + '<span>/</span><a href="categoria.html?cat=' + esc(slug) + '">' + esc(t(cat.name)) +
          "</a><span>/</span><span>" + esc(t(serie.name)) + "</span>",
          t(serie.tagline), t(serie.name), t(serie.intro));
        var sprods = D.productsBySeries(slug, serieSlug);
        if (sectionsEl) {
          sectionsEl.innerHTML = (serie.sections ? seriesSectionsHTML(serie.sections) : "") +
            comparisonTableHTML(sprods);
        }
        grid.innerHTML = sprods.length ? sprods.map(function (p) {
          return cardHTML("producto.html?id=" + p.id, p.model, p.images[0], p.name, t(p.tagline), ui("viewSpecsCta"));
        }).join("") : '<p class="empty">' + esc(ui("emptyCat")) + "</p>";
        setOG({ title: t(serie.name) + " — " + t(cat.name) + " — OSM Argentina/Brasil", desc: t(serie.intro), image: serie.image });
        setJsonLd("ld-breadcrumb", crumbList([{ name: ui("crumbHome"), url: "index.html" }, { name: t(cat.name), url: "categoria.html?cat=" + slug }, { name: t(serie.name), url: "categoria.html?cat=" + slug + "&serie=" + serieSlug }]));
        setJsonLd("ld-itemlist", itemList(t(serie.name), sprods.map(function (p) { return { name: p.name, url: "producto.html?id=" + p.id }; })));
        return;
      }

      // Caso C: categoría directa (sin series).
      document.title = t(cat.name) + " — OSM Argentina/Brasil";
      head.innerHTML = headHTML(homeCrumb + '<span>/</span><span>' + esc(t(cat.name)) + "</span>",
        t(cat.tagline), t(cat.name), t(cat.intro));
      var prods = D.productsByCategory(slug);
      grid.innerHTML = prods.length ? prods.map(function (p) {
        return cardHTML("producto.html?id=" + p.id, p.model, p.images[0], p.name, t(p.tagline), ui("viewSpecsCta"));
      }).join("") : '<p class="empty">' + esc(ui("emptyCat")) + "</p>";
      if (prods.length >= 2) head.insertAdjacentHTML("beforeend", cmpHintHTML());
      setOG({ title: t(cat.name) + " — OSM Argentina/Brasil", desc: t(cat.intro), image: cat.image });
      setJsonLd("ld-breadcrumb", crumbList([{ name: ui("crumbHome"), url: "index.html" }, { name: t(cat.name), url: "categoria.html?cat=" + slug }]));
      setJsonLd("ld-itemlist", itemList(t(cat.name), prods.map(function (p) { return { name: p.name, url: "producto.html?id=" + p.id }; })));
    }

    /* ---------------- Página de PRODUCTO ---------------- */
    function renderProduct() {
      var id = qs("id");
      var p = D.getProduct(id);
      var root = document.getElementById("prod-page");
      if (!p) {
        root.innerHTML = '<div class="container"><p class="empty">' + esc(ui("notFound")) +
          '</p><p><a class="btn btn-red" href="index.html">' + esc(ui("backToCatalog")) + "</a></p></div>";
        document.title = "OSM — " + ui("notFound");
        return;
      }
      var cat = D.getCategory(p.category);
      document.title = p.name + " — OSM Argentina/Brasil";
      var links = contactLinks(p);

      var gallery =
        '<div class="gallery">' +
        '<div class="gallery-main"><img id="gmain" src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" fetchpriority="high" decoding="async"></div>' +
        (p.images.length > 1 ?
          '<div class="gallery-thumbs">' + p.images.map(function (src, i) {
            return '<button type="button" class="thumb' + (i === 0 ? " is-active" : "") +
              '" data-src="' + esc(src) + '"><img src="' + esc(src) + '" alt="' + esc(p.name) + " " + (i + 1) + '" loading="lazy" decoding="async"></button>';
          }).join("") + "</div>" : "") +
        "</div>";

      var info =
        '<div class="product-info">' +
        '<nav class="crumbs"><a href="index.html">' + esc(ui("crumbHome")) + "</a><span>/</span>" +
        '<a href="categoria.html?cat=' + esc(cat.slug) + '">' + esc(t(cat.name)) + "</a>" +
        (p.series && D.getSeries(cat.slug, p.series) ?
          '<span>/</span><a href="categoria.html?cat=' + esc(cat.slug) + "&serie=" + esc(p.series) + '">' +
          esc(t(D.getSeries(cat.slug, p.series).name)) + "</a>" : "") +
        "</nav>" +
        '<span class="product-model">' + esc(p.model) + "</span>" +
        "<h1>" + esc(p.name) + "</h1>" +
        '<p class="product-tagline">' + esc(t(p.tagline)) + "</p>" +
        '<div class="product-cta">' +
        '<div class="contact-channels product-channels">' +
        ctaChannel(links, ui("inquireWhatsapp"), "wa") +
        ctaChannel(links, ui("inquireEmail"), "mail") +
        "</div>" +
        '<button type="button" class="btn btn-outline btn-lg btn-print">' + esc(ui("printSheet")) + "</button>" +
        "</div>" +
        '<p class="inquire-lead">' + esc(ui("inquireLead")) + "</p>" +
        "</div>";

      var desc = t(p.description) || [];
      var descBlock = (p.description && desc.length) ?
        '<div class="block"><h2>' + esc(ui("descTitle")) + "</h2>" +
        desc.map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("") + "</div>" : "";

      var featBlock = "";
      if (p.featureBlocks && p.featureBlocks.length) {
        featBlock = '<div class="block"><h2>' + esc(ui("featuresTitle")) + '</h2><div class="feature-blocks">' +
          p.featureBlocks.map(function (b) {
            return '<div class="fblock"><h3>' + esc(t(b.title)) + "</h3><p>" + esc(t(b.text)) + "</p></div>";
          }).join("") + "</div></div>";
      } else if (p.features && p.features.length) {
        featBlock = '<div class="block"><h2>' + esc(ui("featuresTitle")) + '</h2><ul class="feature-list">' +
          p.features.map(function (f) { return "<li>" + esc(t(f)) + "</li>"; }).join("") + "</ul></div>";
      }

      var specBlock = (p.specs && p.specs.length) ?
        '<div class="block"><h2>' + esc(ui("specsTitle")) + '</h2><table class="spec-table"><tbody>' +
        p.specs.map(function (s) {
          return "<tr><th>" + esc(t(s.label)) + "</th><td>" + esc(t(s.value)) + "</td></tr>";
        }).join("") + "</tbody></table></div>" : "";

      // Relacionados: misma categoría primero, luego otros; sin el actual.
      var related = D.products.filter(function (x) { return x.id !== p.id; });
      related.sort(function (a, b) {
        return (b.category === p.category) - (a.category === p.category);
      });
      related = related.slice(0, 3);
      var relBlock = related.length ?
        '<section class="cats"><div class="container">' +
        '<div class="section-head"><span class="hatch"></span><div><div class="kicker"><span>' + esc(ui("relatedTitle")) +
        '</span></div><h2>' + esc(ui("relatedTitle")) + "</h2></div></div>" +
        '<div class="cat-grid" data-stagger>' + related.map(function (r) {
          return '<a class="cat-card" href="producto.html?id=' + esc(r.id) + '">' +
            '<div class="cat-top"><span class="cat-num">' + esc(r.model) + '</span><span class="hatch hatch-sm"></span></div>' +
            '<div class="cat-img"><img src="' + esc(r.images[0]) + '" alt="' + esc(r.name) + '" loading="lazy"></div>' +
            '<div class="cat-body"><h3>' + esc(r.name) + "</h3><p>" + esc(t(r.tagline)) + "</p>" +
            '<span class="tag-dark">' + esc(ui("viewSpecsCta")) + "</span></div></a>";
        }).join("") + "</div></div></section>" : "";

      var hasSide = !!specBlock;
      var prodSections = (p.sections && p.sections.length) ? seriesSectionsHTML(p.sections) : "";
      root.innerHTML =
        '<section class="product"><div class="container product-grid">' + gallery + info + "</div></section>" +
        '<section class="product-detail" data-reveal><div class="container' + (hasSide ? " detail-grid" : "") + '">' +
        '<div class="detail-main">' + descBlock + featBlock + "</div>" +
        (hasSide ? '<aside class="detail-side">' + specBlock + "</aside>" : "") +
        "</div></section>" + prodSections + relBlock;

      // SEO: Open Graph + JSON-LD (Product + Breadcrumb), reemplazado en cada render/idioma.
      setOG({ title: p.name + " — OSM Argentina/Brasil", desc: t(p.tagline), image: p.images[0], type: "product" });
      setJsonLd("ld-product", {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p.name,
        "sku": p.model,
        "category": t(cat.name),
        "description": t(p.tagline),
        "image": p.images.map(function (s) { return absUrl(s); }),
        "brand": { "@type": "Brand", "name": "OSM" },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD",
          "price": "0",
          "seller": { "@type": "Organization", "name": "OSM Argentina/Brasil" }
        }
      });
      var pcrumbs = [{ name: ui("crumbHome"), url: "index.html" }, { name: t(cat.name), url: "categoria.html?cat=" + cat.slug }];
      if (p.series && D.getSeries(cat.slug, p.series)) pcrumbs.push({ name: t(D.getSeries(cat.slug, p.series).name), url: "categoria.html?cat=" + cat.slug + "&serie=" + p.series });
      pcrumbs.push({ name: p.name, url: "producto.html?id=" + p.id });
      setJsonLd("ld-breadcrumb", crumbList(pcrumbs));

      // Galería: cambiar imagen principal al clickear thumbnail.
      var main = document.getElementById("gmain");
      var thumbs = root.querySelectorAll(".thumb");
      for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener("click", function () {
          var src = this.getAttribute("data-src");
          if (main.getAttribute("src") !== src) {
            main.style.opacity = "0";
            var reveal = function () { main.style.opacity = "1"; main.removeEventListener("load", reveal); };
            main.addEventListener("load", reveal);
            main.src = src;
          }
          for (var j = 0; j < thumbs.length; j++) thumbs[j].classList.remove("is-active");
          this.classList.add("is-active");
        });
      }
    }

    function renderAll() {
      if (catPage) renderCategory();
      if (prodPage) renderProduct();
      if (window.OSM_REVEAL) window.OSM_REVEAL.scan();
      updateCompareBar();
    }

    // i18n.js dispara "osm:lang" en su apply inicial (DOMContentLoaded), por lo
    // que el primer render usa el idioma correcto. También re-renderiza al cambiar.
    document.addEventListener("osm:lang", renderAll);

    // Modal del gráfico comparativo (listeners delegados, una sola vez).
    document.addEventListener("click", function (e) {
      var cb = e.target.closest(".cmp-close");
      if (cb) { closeModalEl(cb.closest(".cmp-modal, .compare-modal")); return; }
      if (e.target.classList && (e.target.classList.contains("cmp-modal") || e.target.classList.contains("compare-modal"))) { closeModalEl(e.target); return; }
      var add = e.target.closest(".cmp-add");
      if (add) {
        e.preventDefault(); e.stopPropagation();
        var id = add.getAttribute("data-id");
        if (toggleCompare(id)) { add.classList.toggle("on", isCompared(id)); updateCompareBar(); }
        return;
      }
      if (e.target.closest(".cmp-bar-open")) { openComparator(); return; }
      if (e.target.closest(".cmp-bar-clear")) { compareState.length = 0; saveCompare(); updateCompareBar(); markComparedCards(); return; }
      var tog = e.target.closest(".calc-toggle");
      if (tog) { var sec = tog.closest(".calc-collapse"); if (sec) { var op = sec.classList.toggle("open"); tog.setAttribute("aria-expanded", op ? "true" : "false"); } return; }
      if (e.target.closest(".calc-btn")) { computeTonnage(); return; }
      if (e.target.closest(".btn-print")) { openDatasheet(D.getProduct(qs("id"))); return; }
      if (e.target.closest(".sheet-save")) { window.print(); return; }
      if (e.target.closest(".sheet-close-btn")) { closeSheet(); return; }
      if (e.target.classList && e.target.classList.contains("sheet-modal")) { closeSheet(); return; }
      var row = e.target.closest(".cmp-row");
      if (row && !e.target.closest("a")) openCmpChart(row);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeSheet(); closeModalEl(document.querySelector(".cmp-modal") || document.querySelector(".compare-modal")); return; }
      var a = document.activeElement;
      if ((e.key === "Enter" || e.key === " ") && a && a.classList && a.classList.contains("cmp-row")) {
        e.preventDefault(); openCmpChart(a);
      }
    });

    renderAll();
  });
})();

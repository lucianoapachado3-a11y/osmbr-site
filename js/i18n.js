/* OSM Argentina/Brasil — i18n (ES/PT/EN) en JS vanilla, sin build ni JSON externo
   (evita CORS sobre file://). Aplica textos a [data-i18n], persiste en localStorage. */
(function () {
  "use strict";

  // Nombres de categoría: iguales en los 3 idiomas (marca).
  var CATS = {
    cat1Name: "Industria 4.0",
    cat2Name: "CNC Press Brake",
    cat3Name: "Flexible Bending Center"
  };

  var DICT = {
    es: {
      navInicio: "Inicio", navCategorias: "Categorías", navContacto: "Contacto",
      ctaWhatsapp: "WhatsApp", ctaCatalogo: "Ver catálogo", ctaVerProductos: "Ver productos",
      heroKicker: "Distribuidor oficial OSM CNC",
      heroTitleB: "Maquinaria CNC de plegado para producción exigente",
      heroSub: "Prensas plegadoras, centros de plegado flexible y automatización robótica OSM. Fichas técnicas completas y atención directa para Argentina y Brasil.",
      chip1: "3 líneas de producto", chip2: "Soporte AR · BR", chip3: "Atención directa",
      catKicker: "Catálogo", catTitle: "Categorías",
      cat1Desc: "Estación de plegado robótica automatizada para producción continua sin operario.",
      cat2Desc: "Prensas plegadoras CNC de alta precisión y repetibilidad.",
      cat3Desc: "Centro de plegado flexible para piezas complejas y series cortas.",
      contactKicker: "Contacto", contactTitle: "Coordiná tu compra",
      contactSub: "Contacto directo con OSM Argentina/Brasil. Sin intermediarios, atención en español y portugués.",
      hours: "Lun a Vie · 9–18h (GMT-3)",
      footTagline: "Distribuidor OSM CNC para Argentina y Brasil.",
      footNavTitle: "Catálogo", footContactTitle: "Contacto",
      crumbHome: "Inicio", crumbCatalog: "Catálogo",
      descTitle: "Descripción", specsTitle: "Especificaciones técnicas",
      featuresTitle: "Características", relatedTitle: "Productos relacionados", compareTitle: "Comparativa de modelos",
      backToCatalog: "← Volver al inicio", viewSpecsCta: "Ver ficha", viewSeriesCta: "Ver serie",
      inquireWhatsapp: "Consultar por WhatsApp", inquireEmail: "Consultar por email", inquireSupport: "Soporte",
      inquireLead: "¿Te interesa este equipo? Coordiná una cotización directa con OSM Argentina/Brasil.",
      notFound: "Producto no encontrado.", emptyCat: "Pronto sumaremos más productos a esta categoría.",
      waMsg: "Hola, me interesa el {p} de OSM. Quisiera coordinar una compra.",
      calcTitle: "Calculadora de tonelaje", calcIntro: "Estimá la fuerza de plegado que necesitás y qué modelos la cubren.",
      calcMaterial: "Material", matMild: "Acero dulce", matStainless: "Acero inoxidable", matAlu: "Aluminio",
      calcThk: "Espesor (mm)", calcLen: "Longitud de plegado (mm)", calcBtn: "Calcular",
      calcVdie: "Apertura de matriz (V) estimada", calcReq: "Fuerza requerida (aprox.)", calcModels: "Modelos que la cubren",
      calcNone: "Ningún modelo del catálogo alcanza esa fuerza. Escribinos para opciones mayores.",
      calcNote: "Estimación para plegado al aire con V ≈ 8 × espesor. Valor orientativo; confirmar con OSM.",
      calcFill: "Completá los datos y tocá Calcular.",
      cmpAdd: "Comparar", cmpAdded: "Quitar", cmpBar: "Seleccionados para comparar", cmpOpen: "Comparar", cmpClear: "Limpiar", cmpMin: "Elegí al menos 2 modelos.", cmpHint: "¿Dudás entre modelos? Tocá el botón + de hasta 4 productos y después “Comparar” para verlos lado a lado.", cmpModalTitle: "Comparación de modelos",
      printSheet: "Descargar ficha (PDF)",
      searchOpen: "Buscar", searchTitle: "Buscar máquina", searchPlaceholder: "Buscar modelo (ej. OG-100, servo, 2000 kN)…", searchNoResults: "Sin resultados",
      sheetLabel: "Ficha técnica", sheetSave: "Guardar PDF", sheetClose: "Cerrar", sheetSpecs: "Especificaciones principales"
    },
    pt: {
      navInicio: "Início", navCategorias: "Categorias", navContacto: "Contato",
      ctaWhatsapp: "WhatsApp", ctaCatalogo: "Ver catálogo", ctaVerProductos: "Ver produtos",
      heroKicker: "Distribuidor oficial OSM CNC",
      heroTitleB: "Máquinas CNC de dobra para produção exigente",
      heroSub: "Dobradeiras, centros de dobra flexível e automação robótica OSM. Fichas técnicas completas e atendimento direto para Argentina e Brasil.",
      chip1: "3 linhas de produto", chip2: "Suporte AR · BR", chip3: "Atendimento direto",
      catKicker: "Catálogo", catTitle: "Categorias",
      cat1Desc: "Estação de dobra robótica automatizada para produção contínua sem operador.",
      cat2Desc: "Dobradeiras CNC de alta precisão e repetibilidade.",
      cat3Desc: "Centro de dobra flexível para peças complexas e séries curtas.",
      contactKicker: "Contato", contactTitle: "Combine sua compra",
      contactSub: "Contato direto com a OSM Argentina/Brasil. Sem intermediários, atendimento em espanhol e português.",
      hours: "Seg a Sex · 9–18h (GMT-3)",
      footTagline: "Distribuidor OSM CNC para Argentina e Brasil.",
      footNavTitle: "Catálogo", footContactTitle: "Contato",
      crumbHome: "Início", crumbCatalog: "Catálogo",
      descTitle: "Descrição", specsTitle: "Especificações técnicas",
      featuresTitle: "Características", relatedTitle: "Produtos relacionados", compareTitle: "Comparativo de modelos",
      backToCatalog: "← Voltar ao início", viewSpecsCta: "Ver ficha", viewSeriesCta: "Ver série",
      inquireWhatsapp: "Consultar pelo WhatsApp", inquireEmail: "Consultar por email", inquireSupport: "Suporte",
      inquireLead: "Interessado neste equipamento? Combine um orçamento direto com a OSM Argentina/Brasil.",
      notFound: "Produto não encontrado.", emptyCat: "Em breve mais produtos nesta categoria.",
      waMsg: "Olá, tenho interesse no {p} da OSM. Gostaria de combinar uma compra.",
      calcTitle: "Calculadora de tonelagem", calcIntro: "Estime a força de dobra necessária e quais modelos a atendem.",
      calcMaterial: "Material", matMild: "Aço doce", matStainless: "Aço inoxidável", matAlu: "Alumínio",
      calcThk: "Espessura (mm)", calcLen: "Comprimento de dobra (mm)", calcBtn: "Calcular",
      calcVdie: "Abertura de matriz (V) estimada", calcReq: "Força necessária (aprox.)", calcModels: "Modelos que a atendem",
      calcNone: "Nenhum modelo do catálogo atinge essa força. Fale conosco para opções maiores.",
      calcNote: "Estimativa para dobra ao ar com V ≈ 8 × espessura. Valor orientativo; confirmar com a OSM.",
      calcFill: "Preencha os dados e toque em Calcular.",
      cmpAdd: "Comparar", cmpAdded: "Remover", cmpBar: "Selecionados para comparar", cmpOpen: "Comparar", cmpClear: "Limpar", cmpMin: "Escolha pelo menos 2 modelos.", cmpHint: "Em dúvida entre modelos? Toque no botão + de até 4 produtos e depois em “Comparar” para vê-los lado a lado.", cmpModalTitle: "Comparação de modelos",
      printSheet: "Baixar ficha (PDF)",
      searchOpen: "Buscar", searchTitle: "Buscar máquina", searchPlaceholder: "Buscar modelo (ex. OG-100, servo, 2000 kN)…", searchNoResults: "Sem resultados",
      sheetLabel: "Ficha técnica", sheetSave: "Salvar PDF", sheetClose: "Fechar", sheetSpecs: "Especificações principais"
    },
    en: {
      navInicio: "Home", navCategorias: "Categories", navContacto: "Contact",
      ctaWhatsapp: "WhatsApp", ctaCatalogo: "View catalog", ctaVerProductos: "View products",
      heroKicker: "Official OSM CNC distributor",
      heroTitleB: "CNC bending machinery for demanding production",
      heroSub: "OSM press brakes, flexible bending centers and robotic automation. Full technical sheets and direct support for Argentina and Brazil.",
      chip1: "3 product lines", chip2: "AR · BR support", chip3: "Direct support",
      catKicker: "Catalog", catTitle: "Categories",
      cat1Desc: "Automated robotic bending workstation for continuous lights-out production.",
      cat2Desc: "High-precision, high-repeatability CNC press brakes.",
      cat3Desc: "Flexible bending center for complex parts and short runs.",
      contactKicker: "Contact", contactTitle: "Let's set up your purchase",
      contactSub: "Direct contact with OSM Argentina/Brazil. No middlemen, support in Spanish and Portuguese.",
      hours: "Mon–Fri · 9am–6pm (GMT-3)",
      footTagline: "OSM CNC distributor for Argentina and Brazil.",
      footNavTitle: "Catalog", footContactTitle: "Contact",
      crumbHome: "Home", crumbCatalog: "Catalog",
      descTitle: "Description", specsTitle: "Technical specifications",
      featuresTitle: "Features", relatedTitle: "Related products", compareTitle: "Model comparison",
      backToCatalog: "← Back to home", viewSpecsCta: "View details", viewSeriesCta: "View series",
      inquireWhatsapp: "Ask on WhatsApp", inquireEmail: "Ask by email", inquireSupport: "Support",
      inquireLead: "Interested in this machine? Get a direct quote from OSM Argentina/Brazil.",
      notFound: "Product not found.", emptyCat: "More products coming soon to this category.",
      waMsg: "Hi, I'm interested in the OSM {p}. I'd like to arrange a purchase.",
      calcTitle: "Tonnage calculator", calcIntro: "Estimate the bending force you need and which models cover it.",
      calcMaterial: "Material", matMild: "Mild steel", matStainless: "Stainless steel", matAlu: "Aluminum",
      calcThk: "Thickness (mm)", calcLen: "Bending length (mm)", calcBtn: "Calculate",
      calcVdie: "Estimated die opening (V)", calcReq: "Required force (approx.)", calcModels: "Models that cover it",
      calcNone: "No catalog model reaches that force. Contact us for larger options.",
      calcNote: "Estimate for air bending with V ≈ 8 × thickness. Indicative value; confirm with OSM.",
      calcFill: "Fill in the data and tap Calculate.",
      cmpAdd: "Compare", cmpAdded: "Remove", cmpBar: "Selected to compare", cmpOpen: "Compare", cmpClear: "Clear", cmpMin: "Pick at least 2 models.", cmpHint: "Choosing between models? Tap the + button on up to 4 products, then “Compare” to see them side by side.", cmpModalTitle: "Model comparison",
      printSheet: "Download sheet (PDF)",
      searchOpen: "Search", searchTitle: "Search machine", searchPlaceholder: "Search model (e.g. OG-100, servo, 2000 kN)…", searchNoResults: "No results",
      sheetLabel: "Datasheet", sheetSave: "Save PDF", sheetClose: "Close", sheetSpecs: "Key specifications"
    }
  };

  var LANGS = ["es", "pt", "en"];
  var STORE = "osm_lang";
  var current = "es";
  var OG_LOCALE = { es: "es_ES", pt: "pt_BR", en: "en_US" };

  // URL de la página para un idioma dado (preserva cat/id/serie, normaliza hash).
  function urlForLang(lang) {
    try {
      var u = new URL(location.href);
      u.searchParams.delete("lang");
      u.hash = "";
      if (lang) u.searchParams.set("lang", lang);
      return u.origin + u.pathname + (u.search || "");
    } catch (e) { return location.href; }
  }
  function upsertLink(rel, hl, href) {
    var sel = 'link[rel="' + rel + '"]' + (hl ? '[hreflang="' + hl + '"]' : "");
    var el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      if (hl) el.setAttribute("hreflang", hl);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }
  function setMetaProp(prop, content) {
    var el = document.head.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  // Canonical (self) + hreflang es/pt/en/x-default. El idioma sale de ?lang.
  function buildSeo() {
    var p = null;
    try { p = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (LANGS.indexOf(p) === -1) p = null;
    upsertLink("canonical", null, urlForLang(p));
    upsertLink("alternate", "es", urlForLang("es"));
    upsertLink("alternate", "pt", urlForLang("pt"));
    upsertLink("alternate", "en", urlForLang("en"));
    upsertLink("alternate", "x-default", urlForLang(null));
    setMetaProp("og:url", urlForLang(p));
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "es";
    current = lang;
    var d = DICT[lang];
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var val = (key in CATS) ? CATS[key] : d[key];
      if (val != null) nodes[i].textContent = val;
    }
    var btns = document.querySelectorAll(".lang-switch [data-lang]");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("is-active", btns[j].getAttribute("data-lang") === lang);
    }
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    setMetaProp("og:locale", OG_LOCALE[lang]);
    document.dispatchEvent(new CustomEvent("osm:lang", { detail: lang }));
  }

  function initial() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && LANGS.indexOf(q) !== -1) return q;
    } catch (e) {}
    var saved;
    try { saved = localStorage.getItem(STORE); } catch (e) {}
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : "es";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btns = document.querySelectorAll(".lang-switch [data-lang]");
    for (var i = 0; i < btns.length; i++) {
      (function (b) {
        b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
      })(btns[i]);
    }
    apply(initial());
    buildSeo();
  });

  // Expuesto por si otras páginas lo necesitan.
  window.OSM_I18N = {
    apply: apply, dict: DICT, cats: CATS, langs: LANGS,
    current: function () { return current; },
    t: function (key) { return (DICT[current] && DICT[current][key]) || (key in CATS ? CATS[key] : key); }
  };
})();

/* OSM — Scroll reveal por IntersectionObserver. Anima opacity/transform.
   Respeta prefers-reduced-motion (muestra todo sin animar). Idempotente:
   re-escaneable tras renders dinámicos vía window.OSM_REVEAL.scan(). */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function staggerPrep(el) {
    var k = el.children;
    for (var i = 0; i < k.length; i++) {
      k[i].style.transitionDelay = Math.min(i * 55, 330) + "ms";
    }
  }

  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      if (e.target.hasAttribute("data-stagger")) staggerPrep(e.target);
      e.target.classList.add("rv-in");
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }) : null;

  // Fade-in de imágenes lazy al cargar (evita el "salto" en blanco).
  function imgFade() {
    var imgs = document.querySelectorAll('img[loading="lazy"]:not(.lazyfade)');
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      im.classList.add("lazyfade");
      if (reduce || (im.complete && im.naturalWidth > 0)) {
        im.classList.add("is-loaded");
      } else {
        (function (x) {
          x.addEventListener("load", function () { x.classList.add("is-loaded"); });
          x.addEventListener("error", function () { x.classList.add("is-loaded"); });
        })(im);
      }
    }
  }

  function scan() {
    imgFade();
    var list = document.querySelectorAll("[data-reveal]:not(.rv-in),[data-stagger]:not(.rv-in)");
    if (reduce || !io) {
      for (var i = 0; i < list.length; i++) list[i].classList.add("rv-in");
      return;
    }
    for (var j = 0; j < list.length; j++) io.observe(list[j]);
  }

  window.OSM_REVEAL = { scan: scan };
  document.addEventListener("DOMContentLoaded", scan);

  // Barra de progreso de scroll (solo si está el elemento, p.ej. producto).
  var pbar = document.querySelector(".scroll-progress-bar");
  if (pbar) {
    var ticking = false;
    function updProgress() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      pbar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(updProgress); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", updProgress);
    updProgress();
  }
})();

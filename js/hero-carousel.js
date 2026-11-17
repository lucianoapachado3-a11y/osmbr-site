/* OSM — Carrusel del hero (3 categorías). Flechas, puntos, auto-avance con
   pausa al hover/focus, swipe táctil y teclado. Sin dependencias. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".car-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-car-go]"));
    var tag = root.querySelector("[data-car-tag]");
    var prev = root.querySelector("[data-car-prev]");
    var next = root.querySelector("[data-car-next]");
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var DELAY = 5000;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      for (var s = 0; s < slides.length; s++) {
        slides[s].classList.toggle("is-active", s === index);
      }
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("is-active", d === index);
        dots[d].setAttribute("aria-selected", d === index ? "true" : "false");
      }
      if (tag) tag.textContent = slides[index].getAttribute("data-tag") || "";
    }

    function go(i) { show(i); restart(); }
    function nextSlide() { show(index + 1); }

    function start() {
      if (reduce) return;
      stop();
      timer = setInterval(nextSlide, DELAY);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () { go(parseInt(dot.getAttribute("data-car-go"), 10)); });
    });

    // Pausa al interactuar
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    // Teclado (flechas) cuando el carrusel tiene foco
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); }
      else if (e.key === "ArrowRight") { go(index + 1); }
    });

    // Swipe táctil
    var x0 = null;
    var viewport = root.querySelector(".car-viewport");
    if (viewport) {
      viewport.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) { go(dx < 0 ? index + 1 : index - 1); }
        x0 = null;
      });
    }

    // Pausa cuando la pestaña no está visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    show(0);
    start();
  });
})();

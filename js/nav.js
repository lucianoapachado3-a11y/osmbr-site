/* OSM — Menú mobile (hamburguesa). Abre/cierra el panel colapsable del header.
   Cierra al elegir un link, al click fuera, con Escape o al pasar a desktop. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var toggle = header && header.querySelector(".nav-toggle");
    if (!toggle) return;
    var menu = document.getElementById("navmenu");

    function close() {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function toggleMenu(e) {
      e.stopPropagation();
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", toggleMenu);
    if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("click", function (e) {
      if (header.classList.contains("nav-open") && !header.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 720) close(); });

    // Elevación del header al hacer scroll
    function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });
})();

/* OSM — Lightbox de la galería de producto. Click en la imagen principal abre
   pantalla completa con navegación (flechas/teclado/swipe) y zoom al click.
   Sin dependencias. Usa delegación de eventos (la galería es dinámica). */
(function () {
  "use strict";

  var box = null, imgEl = null, counter = null, list = [], idx = 0, zoomed = false;

  function collect() {
    var imgs = [];
    var thumbs = document.querySelectorAll(".gallery-thumbs .thumb");
    if (thumbs.length) {
      for (var i = 0; i < thumbs.length; i++) {
        var s = thumbs[i].getAttribute("data-src");
        if (s) imgs.push(s);
      }
    } else {
      var main = document.getElementById("gmain");
      if (main) imgs.push(main.getAttribute("src"));
    }
    return imgs;
  }

  function unzoom() {
    zoomed = false;
    imgEl.classList.remove("zoomed");
    imgEl.style.transformOrigin = "center center";
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    imgEl.src = list[idx];
    unzoom();
    counter.textContent = list.length > 1 ? (idx + 1) + " / " + list.length : "";
    var nav = list.length > 1 ? "" : "none";
    box.querySelector(".lb-prev").style.display = nav;
    box.querySelector(".lb-next").style.display = nav;
  }

  function panZoom(e) {
    if (!zoomed) return;
    var r = imgEl.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width) * 100;
    var y = ((e.clientY - r.top) / r.height) * 100;
    imgEl.style.transformOrigin = Math.max(0, Math.min(100, x)) + "% " + Math.max(0, Math.min(100, y)) + "%";
  }

  function toggleZoom(e) {
    zoomed = !zoomed;
    imgEl.classList.toggle("zoomed", zoomed);
    if (zoomed) panZoom(e); else imgEl.style.transformOrigin = "center center";
  }

  function open(startSrc) {
    list = collect();
    if (!list.length) return;
    var start = list.indexOf(startSrc);
    if (start < 0) start = 0;
    box = document.createElement("div");
    box.className = "lb-overlay";
    box.innerHTML =
      '<button type="button" class="lb-close" aria-label="Cerrar">&times;</button>' +
      '<button type="button" class="lb-arrow lb-prev" aria-label="Anterior">&#8249;</button>' +
      '<img class="lb-img" alt="">' +
      '<button type="button" class="lb-arrow lb-next" aria-label="Siguiente">&#8250;</button>' +
      '<div class="lb-counter"></div>';
    document.body.appendChild(box);
    document.body.classList.add("cmp-lock");
    imgEl = box.querySelector(".lb-img");
    counter = box.querySelector(".lb-counter");
    show(start);
    requestAnimationFrame(function () { box.classList.add("open"); });

    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    box.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    imgEl.addEventListener("click", function (e) { e.stopPropagation(); toggleZoom(e); });
    imgEl.addEventListener("mousemove", panZoom);

    var x0 = null;
    imgEl.addEventListener("touchstart", function (e) { if (!zoomed) x0 = e.touches[0].clientX; }, { passive: true });
    imgEl.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40 && list.length > 1) show(dx < 0 ? idx + 1 : idx - 1);
      x0 = null;
    });
  }

  function close() {
    if (!box) return;
    var b = box; box = null;
    b.classList.remove("open");
    document.body.classList.remove("cmp-lock");
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 200);
  }

  document.addEventListener("click", function (e) {
    var m = e.target.closest("#gmain");
    if (m) { e.preventDefault(); open(m.getAttribute("src")); }
  });
  document.addEventListener("keydown", function (e) {
    if (!box) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });
})();

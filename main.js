(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  (function heroReveal() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    function go() { hero.classList.add("reveal-in"); }
    if (reduceMotion) { go(); return; }
    window.setTimeout(go, 850);
    window.setTimeout(go, 1800);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") go();
    });
  })();

  (function portrait() {
    var fig = document.getElementById("portrait");
    var img = document.getElementById("portraitImg");
    if (!fig || !img) return;
    function reveal() { fig.classList.remove("no-photo"); }
    function keep() { fig.classList.add("no-photo"); }
    if (img.complete) {
      if (img.naturalWidth > 1) reveal(); else keep();
    } else {
      img.addEventListener("load", function () { if (img.naturalWidth > 1) reveal(); });
      img.addEventListener("error", keep);
    }
  })();

  (function header() {
    var el = document.getElementById("siteHeader");
    if (!el) return;
    var ticking = false;
    function update() {
      el.setAttribute("data-scrolled", window.scrollY > 24 ? "true" : "false");
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  (function reveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var key = el.closest("section") || document.body;
        var kid = key.__k || 0;
        el.style.transitionDelay = (Math.min(kid, 5) * 55) + "ms";
        key.__k = kid + 1;
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });

    function revealAll() { items.forEach(function (el) { el.classList.add("is-visible"); }); }
    window.setTimeout(revealAll, 4000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") revealAll();
    });
  })();

  (function spy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var spyIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { spyIo.observe(document.getElementById(id)); });
  })();
})();

(function () {
  "use strict";

  var canvas = document.getElementById("fx");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TINTS = ["232,240,250", "198,217,239", "156,189,223", "126,167,201"];
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, particles = [], raf = 0, start = 0, running = false;
  var GATHER = 1500, STAGGER = 340;
  var settled = false;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function size() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function build() {
    var count = Math.round((W * H) / 2600);
    count = Math.max(480, Math.min(count, 1300));
    if (DPR > 1) count = Math.round(count * 0.7);

    var cx = W / 2, cy = H / 2;
    var radius = Math.sqrt(W * W + H * H) * 0.72;
    particles = new Array(count);
    for (var i = 0; i < count; i++) {
      var tx = rand(0, W), ty = rand(0, H);
      var a = rand(0, Math.PI * 2);
      particles[i] = {
        tx: tx, ty: ty,
        sx: cx + Math.cos(a) * radius * rand(0.85, 1.3),
        sy: cy + Math.sin(a) * radius * rand(0.85, 1.3),
        x: tx, y: ty,
        delay: (i / count) * STAGGER + rand(0, 140),
        px: rand(0, Math.PI * 2), py: rand(0, Math.PI * 2),
        amp: rand(5, 18), spd: rand(0.12, 0.42),
        tint: TINTS[(Math.random() * TINTS.length) | 0],
        alpha: rand(0.32, 0.9), r: rand(1.05, 1.65)
      };
    }
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function dot(q) {
    ctx.fillStyle = "rgba(" + q.tint + "," + q.alpha.toFixed(3) + ")";
    ctx.beginPath();
    ctx.arc(q.x, q.y, q.r, 0, 6.2832);
    ctx.fill();
  }

  function paintSettled() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x = p.tx;
      p.y = p.ty;
      dot(p);
    }
  }

  function frame(now) {
    var t = now - start;
    ctx.clearRect(0, 0, W, H);
    var gathering = !settled && t < GATHER + STAGGER + 160;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (gathering) {
        var lt = (t - p.delay) / GATHER;
        if (lt <= 0) {
          p.x = p.sx;
          p.y = p.sy;
        } else if (lt >= 1) {
          p.x = p.tx;
          p.y = p.ty;
        } else {
          var e = easeOut(lt);
          p.x = p.sx + (p.tx - p.sx) * e;
          p.y = p.sy + (p.ty - p.sy) * e;
        }
      } else {
        settled = true;
        var dt = now * 0.001 * p.spd;
        p.x = p.tx + Math.cos(p.px + dt) * p.amp;
        p.y = p.ty + Math.sin(p.py + dt) * p.amp * 0.7;
      }
      dot(p);
    }
    if (running) raf = window.requestAnimationFrame(frame);
  }

  function startLoop(fresh) {
    if (running) return;
    running = true;
    if (fresh) start = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function stopLoop() {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function init() {
    size();
    build();
    if (reduce) {
      settled = true;
      paintSettled();
      return;
    }
    if (document.hidden) {
      settled = true;
      paintSettled();
    } else {
      startLoop(true);
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) startLoop(false);
        else stopLoop();
      }, { threshold: 0 }).observe(canvas);
    }
  }

  function complete() { settled = true; }
  window.addEventListener("pointerdown", complete, { passive: true });
  window.addEventListener("keydown", complete);
  window.addEventListener("wheel", complete, { passive: true });

  var rz;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      var was = settled;
      size();
      build();
      settled = was;
      if (was) paintSettled();
    }, 200);
  }, { passive: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

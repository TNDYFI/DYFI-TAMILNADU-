/* DYFI Tamil Nadu — shared behaviour (vanilla JS, no dependencies besides Bootstrap carousel) */
(function () {
  "use strict";
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var small = window.innerWidth < 768;

  /* Preloader (safe even if an external file is slow) */
  var pre = $("#preloader");
  function hidePre() { if (pre) { pre.classList.add("done"); setTimeout(function () { pre && pre.remove(); pre = null; }, 600); } }
  window.addEventListener("load", function () { setTimeout(hidePre, 300); });
  setTimeout(hidePre, 3500);

  /* Sidebar */
  var side = $("#side"), btn = $("#menuBtn"), scrim = $("#scrim");
  function setNav(open) {
    if (!side) return;
    side.classList.toggle("open", open);
    if (btn) { btn.setAttribute("aria-expanded", open); btn.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars"; }
    d.body.style.overflow = open && window.innerWidth < 992 ? "hidden" : "";
  }
  if (btn) btn.addEventListener("click", function () { setNav(!side.classList.contains("open")); });
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  d.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
  $$("#side a").forEach(function (a) { a.addEventListener("click", function () { if (window.innerWidth < 992) setNav(false); }); });
  window.addEventListener("resize", function () { if (window.innerWidth >= 992) setNav(false); });

  /* Active link: scroll-spy on the home page, fixed highlight elsewhere */
  var links = $$("#side nav a[data-sec]");
  function spy() {
    var y = window.scrollY + 160, cur = null;
    links.forEach(function (a) { var s = $("#" + a.dataset.sec); if (s && s.offsetTop <= y) cur = a; });
    links.forEach(function (a) { a.classList.toggle("active", a === cur); });
  }
  if (d.body.dataset.page === "home" && links.length) { spy(); window.addEventListener("scroll", spy, { passive: true }); }

  /* Back to top */
  var top = $(".totop");
  if (top) window.addEventListener("scroll", function () { top.classList.toggle("on", window.scrollY > 500); }, { passive: true });

  /* Ambient particles (stars + dots) — transform/opacity only */
  var fx = $(".bg-fx");
  if (fx && !reduce) {
    var n = small ? 7 : 16;
    for (var i = 0; i < n; i++) {
      var p = d.createElement("i"), s = 8 + Math.random() * 14;
      p.className = "p " + (i % 3 ? "d" : "s");
      p.style.cssText = "left:" + (Math.random() * 100) + "%;width:" + s + "px;height:" + s + "px;animation-duration:" + (16 + Math.random() * 20) + "s;animation-delay:-" + (Math.random() * 30) + "s;--dx:" + (Math.random() * 120 - 60) + "px";
      fx.appendChild(p);
    }
  }

  /* Scroll animations: enter on the way down, re-play when scrolling back up */
  var items = $$("[data-a]");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); $$("[data-count]", e.target).concat(e.target.dataset.count !== undefined ? [e.target] : []).forEach(function (c) { count(c); }); }
        else if (e.boundingClientRect.top > 0) e.target.classList.remove("in"); /* left via the bottom → reverse */
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); if (el.dataset.count !== undefined) count(el, true); });

  function count(el, now) {
    var end = +el.dataset.count || 0, t0 = null, dur = now || reduce ? 1 : 1800;
    if (el._c) return; el._c = 1;
    (function step(t) { t0 = t0 || t; var k = Math.min((t - t0) / dur, 1); el.textContent = Math.floor(end * (1 - Math.pow(1 - k, 3))).toLocaleString("en-IN"); if (k < 1) requestAnimationFrame(step); })(performance.now());
  }

  /* Light parallax */
  var px = $$("[data-px]");
  if (px.length && !reduce && !small) {
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () { px.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) el.style.transform = "translate3d(0," + ((r.top - innerHeight / 2) * (+el.dataset.px || .06)).toFixed(1) + "px,0)"; }); tick = false; });
    }, { passive: true });
  }

  /* Hero carousel (Bootstrap) */
  var car = $("#heroCarousel");
  if (car && window.bootstrap) { var bc = new bootstrap.Carousel(car, { interval: reduce ? false : 6500, pause: "hover", touch: true }); if (!reduce) bc.cycle(); }

  /* Members: district data (existing figures, unchanged) */
  var box = $("#district-scroll-box");
  if (box) {
 var D = [
  ["வட சென்னை", 17430],
  ["மத்திய சென்னை", 11582],
  ["தென் சென்னை", 18556],
  ["திருவள்ளூர்", 8000],
  ["காஞ்சிபுரம்", 1700],
  ["செங்கல்பட்டு", 2088],
  ["வேலூர்", 2200],
  ["இராணிப்பேட்டை", 350],
  ["விழுப்புரம்", 10180],
  ["கள்ளக்குறிச்சி", 16544],
  ["திருவண்ணாமலை", 16857],
  ["கடலூர்", 15417],
  ["நாகப்பட்டினம்", 26880],
  ["மயிலாடுதுறை", 36647],
  ["திருவாரூர்", 24847],
  ["தஞ்சாவூர்", 9750],
  ["பெரம்பலூர்", 5500],
  ["அரியலூர்", 500],
  ["கரூர்", 1500],
  ["திருச்சி மாநகர்", 11000],
  ["திருச்சி புறநகர்", 8700],
  ["புதுக்கோட்டை", 17410],
  ["சிவகங்கை", 3740],
  ["இராமநாதபுரம்", 1568],
  ["தூத்துக்குடி", 2320],
  ["கன்னியாகுமரி", 14050],
  ["திருநெல்வேலி", 740],
  ["தென்காசி", 500],
  ["விருதுநகர்", 4340],
  ["மதுரை புறநகர்", 8840],
  ["மதுரை மாநகர்", 11076],
  ["தேனி", 3200],
  ["திண்டுக்கல்", 11350],
  ["ஈரோடு", 3655],
  ["கோவை", 13160],
  ["திருப்பூர்", 31285],
  ["நீலகிரி", 2480],
  ["நாமக்கல்", 2760],
  ["சேலம்", 10907],
  ["தருமபுரி", 14230],
  ["கிருஷ்ணகிரி", 10670]
];
    var dc = $("#distCount"); if (dc) { dc.dataset.count = D.length; }
    var max = Math.max.apply(null, D.map(function (x) { return x[1]; })), built = false;
    var build = function () {
      if (built) return; built = true;
      D.forEach(function (x, i) {
        var r = d.createElement("div"); r.className = "dist-row"; r.style.setProperty("--w", "0");
        r.innerHTML = "<span>" + x[0] + "</span><span data-count=\"" + x[1] + "\">0</span>"; box.appendChild(r);
        setTimeout(function () { r.classList.add("visible"); r.style.setProperty("--w", (x[1] / max * 100).toFixed(1) + "%"); count(r.lastChild, reduce); }, reduce ? 0 : i * 40);
      });
    };
    var mem = $("#partners");
    if ("IntersectionObserver" in window && mem) new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { build(); o.disconnect(); } }, { threshold: .1 }).observe(mem); else build();
  }

  /* Android WebView / in-app browser safety:
     internal links always load in the same view; only genuinely external URLs use a new tab. */
  var isInternal = function (u) { try { var a = new URL(u, location.href); return a.protocol === "file:" || a.origin === location.origin; } catch (e) { return true; } };
  $$("a[href]").forEach(function (a) {
    var h = a.getAttribute("href");
    if (/^(mailto:|tel:|sms:|#)/i.test(h)) { a.removeAttribute("target"); return; }
    if (isInternal(h)) a.removeAttribute("target");
    else { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });
  var _open = window.open;
  window.open = function (u, t, f) { if (u && isInternal(u)) { location.href = u; return null; } return _open.call(window, u, t || "_blank", f); };
})();

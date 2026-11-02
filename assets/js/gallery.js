/* DYFI Tamil Nadu — gallery: 100 slots, descriptions with See More, lightbox (data: assets/js/gallery-data.js) */
(function () {
  "use strict";
  var N = window.DYFI_GALLERY_COUNT || 100, D = window.DYFI_GALLERY || {}, g = document.getElementById("galGrid"), lb = document.getElementById("lb"), dd = document.getElementById("descDlg");
  if (!g || !lb) return;
  var P = "விவரம் விரைவில் புதுப்பிக்கப்படும்", slots = [], real = [];
  for (var n = 1; n <= N; n++) { var m = D[n] || {}; slots.push({ n: n, src: m.src || "", title: m.title || "படம் " + n, short: m.short || P, full: m.full || m.short || P }); if (m.src) real.push(n - 1); }
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  slots.forEach(function (m, idx) {
    var a = el("article", "gc"), b = el("div", "gc-b"), f;
    if (m.src) { f = el("button", "gc-im"); f.type = "button"; f.setAttribute("aria-label", m.title + " - பெரிதாகப் பார்க்க"); var im = new Image(); im.src = m.src; im.alt = m.title; im.loading = "lazy"; im.decoding = "async"; im.width = 800; im.height = 600; f.appendChild(im); f.addEventListener("click", function () { open(real.indexOf(idx)); }); }
    else { f = el("div", "gc-im gc-empty"); f.appendChild(el("b", "", String(m.n))); f.appendChild(el("span", "", "படம் சேர்க்கப்பட இடம்")); }
    var mb = el("button", "gc-more", "மேலும் காண"); mb.type = "button"; mb.addEventListener("click", function () { $("ddT").textContent = m.title; $("ddB").textContent = m.full; dd.showModal ? dd.showModal() : dd.setAttribute("open", ""); });
    b.appendChild(el("h3", "", m.title)); b.appendChild(el("p", "", m.short)); b.appendChild(mb); a.appendChild(f); a.appendChild(b); g.appendChild(a);
  });
  function $(i) { return document.getElementById(i); }
  $("ddX").addEventListener("click", function () { dd.close(); }); dd.addEventListener("click", function (e) { if (e.target === dd) dd.close(); });
  var img = lb.querySelector(".lb-st img"), cap = lb.querySelector(".lb-cap"), cnt = lb.querySelector(".lb-cnt"), prev = lb.querySelector(".lb-prev"), next = lb.querySelector(".lb-next"), st = lb.querySelector(".lb-st");
  var i = 0, z = 1, px = 0, py = 0;
  function tf() { img.style.transform = "translate(" + px + "px," + py + "px) scale(" + z + ")"; img.style.cursor = z > 1 ? "grab" : "zoom-in"; }
  function zoom(v) { z = Math.max(1, Math.min(4, v)); if (z === 1) px = py = 0; tf(); }
  function show(k) { i = (k + real.length) % real.length; var m = slots[real[i]]; img.src = m.src; img.alt = m.title; cap.textContent = m.title + " - " + m.short; cnt.textContent = (i + 1) + " / " + real.length; z = 1; px = py = 0; tf(); prev.disabled = next.disabled = real.length < 2; }
  function open(k) { show(k); lb.showModal ? lb.showModal() : lb.setAttribute("open", ""); }
  prev.onclick = function () { show(i - 1); }; next.onclick = function () { show(i + 1); }; lb.querySelector(".lb-x").onclick = function () { lb.close(); };
  lb.querySelector(".lb-zi").onclick = function () { zoom(z + .5); }; lb.querySelector(".lb-zo").onclick = function () { zoom(z - .5); };
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(i - 1); else if (e.key === "ArrowRight") show(i + 1); });
  img.addEventListener("dblclick", function () { zoom(z > 1 ? 1 : 2.5); });
  var sx = 0, sy = 0, ox = 0, oy = 0, drag = false, pd = 0, pz = 1, pts = {};
  st.addEventListener("pointerdown", function (e) { pts[e.pointerId] = e; var k = Object.keys(pts); if (k.length === 2) { pd = Math.hypot(pts[k[0]].clientX - pts[k[1]].clientX, pts[k[0]].clientY - pts[k[1]].clientY); pz = z; } else { sx = e.clientX; sy = e.clientY; ox = px; oy = py; drag = true; } });
  st.addEventListener("pointermove", function (e) { if (!pts[e.pointerId]) return; pts[e.pointerId] = e; var k = Object.keys(pts); if (k.length === 2 && pd) { zoom(pz * Math.hypot(pts[k[0]].clientX - pts[k[1]].clientX, pts[k[0]].clientY - pts[k[1]].clientY) / pd); return; } if (drag && z > 1) { px = ox + e.clientX - sx; py = oy + e.clientY - sy; tf(); } });
  function end(e) { var dx = e.clientX - sx; delete pts[e.pointerId]; if (Object.keys(pts).length < 2) pd = 0; if (drag && z === 1 && Math.abs(dx) > 60) show(i + (dx < 0 ? 1 : -1)); drag = false; }
  st.addEventListener("pointerup", end); st.addEventListener("pointercancel", end);
  st.addEventListener("wheel", function (e) { e.preventDefault(); zoom(z + (e.deltaY < 0 ? .3 : -.3)); }, { passive: false });
})();

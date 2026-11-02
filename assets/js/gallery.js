/* DYFI Tamil Nadu — gallery + lightbox. EDIT the IMAGES list to add or remove pictures (src, title). */
(function () {
  "use strict";
  var IMAGES = window.DYFI_GALLERY || [], g = document.getElementById("galGrid"), lb = document.getElementById("lb");
  if (!g || !lb) return;
  var img = lb.querySelector(".lb-st img"), cap = lb.querySelector(".lb-cap"), cnt = lb.querySelector(".lb-cnt"), prev = lb.querySelector(".lb-prev"), next = lb.querySelector(".lb-next"), st = lb.querySelector(".lb-st");
  var i = 0, z = 1, px = 0, py = 0;
  IMAGES.forEach(function (m, n) {
    var b = document.createElement("button"), im = new Image(); b.type = "button"; b.className = "gal-card"; b.setAttribute("aria-label", m.title + " - பெரிதாகப் பார்க்க");
    im.src = m.src; im.alt = m.alt || m.title; im.loading = "lazy"; im.decoding = "async"; im.width = 1400; im.height = 1050;
    var s = document.createElement("span"); s.textContent = m.title; b.appendChild(im); b.appendChild(s); b.addEventListener("click", function () { open(n); }); g.appendChild(b);
  });
  function tf() { img.style.transform = "translate(" + px + "px," + py + "px) scale(" + z + ")"; img.style.cursor = z > 1 ? "grab" : "zoom-in"; }
  function zoom(v) { z = Math.max(1, Math.min(4, v)); if (z === 1) { px = py = 0; } tf(); }
  function show(n) { i = (n + IMAGES.length) % IMAGES.length; var m = IMAGES[i]; img.src = m.src; img.alt = m.alt || m.title; cap.textContent = m.title; cnt.textContent = (i + 1) + " / " + IMAGES.length; z = 1; px = py = 0; tf(); prev.disabled = next.disabled = IMAGES.length < 2; }
  function open(n) { show(n); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", ""); }
  prev.onclick = function () { show(i - 1); }; next.onclick = function () { show(i + 1); };
  lb.querySelector(".lb-x").onclick = function () { lb.close(); };
  lb.querySelector(".lb-zi").onclick = function () { zoom(z + .5); }; lb.querySelector(".lb-zo").onclick = function () { zoom(z - .5); };
  lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(i - 1); else if (e.key === "ArrowRight") show(i + 1); });
  img.addEventListener("dblclick", function () { zoom(z > 1 ? 1 : 2.5); });
  var sx = 0, sy = 0, ox = 0, oy = 0, drag = false, moved = 0, pd = 0, pz = 1, pts = {};
  st.addEventListener("pointerdown", function (e) { pts[e.pointerId] = e; var k = Object.keys(pts); if (k.length === 2) { pd = Math.hypot(pts[k[0]].clientX - pts[k[1]].clientX, pts[k[0]].clientY - pts[k[1]].clientY); pz = z; } else { sx = e.clientX; sy = e.clientY; ox = px; oy = py; drag = true; moved = 0; } });
  st.addEventListener("pointermove", function (e) {
    if (!pts[e.pointerId]) return; pts[e.pointerId] = e; var k = Object.keys(pts);
    if (k.length === 2 && pd) { zoom(pz * Math.hypot(pts[k[0]].clientX - pts[k[1]].clientX, pts[k[0]].clientY - pts[k[1]].clientY) / pd); return; }
    if (drag && z > 1) { px = ox + e.clientX - sx; py = oy + e.clientY - sy; tf(); } moved = Math.max(moved, Math.abs(e.clientX - sx));
  });
  function end(e) { var dx = e.clientX - sx; delete pts[e.pointerId]; if (Object.keys(pts).length < 2) pd = 0; if (drag && z === 1 && Math.abs(dx) > 60) show(i + (dx < 0 ? 1 : -1)); drag = false; }
  st.addEventListener("pointerup", end); st.addEventListener("pointercancel", end);
  st.addEventListener("wheel", function (e) { e.preventDefault(); zoom(z + (e.deltaY < 0 ? .3 : -.3)); }, { passive: false });
})();

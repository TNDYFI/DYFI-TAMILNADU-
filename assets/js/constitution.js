/* DYFI Tamil Nadu — அமைப்பு சட்டம் digital book (page images of the official document) */
(function () {
  "use strict";
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, app = $("#cb");
  if (!app) return;
  var N = 33, DIR = "assets/constitution/", reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var view = $("#cbView"), book = $("#cbBook"), sl = $(".slot.l", book), sr = $(".slot.r", book), panel = $("#cbPanel"), list = $("#cbList"), bmList = $("#cbBms"),
    prev = $("#cbPrev"), next = $("#cbNext"), prevC = $("#cbPrevC"), nextC = $("#cbNextC"), ind = $("#cbInd"), prog = $("#cbProg"), bm = $("#cbBm"), openB = $("#cbOpen");
  /* [title, PDF page, level] — titles exactly as printed in the document */
  var CH = [["அட்டை", 1, 0], ["தலைப்புப் பக்கம்", 2, 0], ["பதிப்பு விவரம்", 3, 0], ["முகப்புரை", 4, 0], ["நோக்கங்களும்-இலட்சியங்களும்", 15, 0], ["அமைப்புச் சட்டம்", 20, 0],
    ["பிரிவு 1: இணைத்தல்", 20, 1], ["பிரிவு 2: உறுப்பினர் பதிவும், உறுப்பினர்களின் உரிமைகளும், கடமைகளும்", 21, 1], ["பிரிவு 3: அமைப்பின் கட்டமைப்பு", 21, 1], ["பிரிவு 4: மாநாடு", 22, 1], ["பிரிவு 5: குழுக்கள்", 23, 1],
    ["பிரிவு 6: செயற்குழு", 26, 1], ["பிரிவு 7: ஒழுங்கு நடவடிக்கை", 27, 1], ["பிரிவு 8: அமைப்புச் சட்டத்தில் மாற்றங்கள்", 28, 1], ["பிரிவு 9: தமிழ்நாடு மாநில அமைப்பு", 29, 1],
    ["1. மாநில மாநாடு", 29, 2], ["2. மாநிலக்குழு", 30, 2], ["3. மாநிலச் செயற்குழு", 31, 2], ["4. மாவட்ட மாநாடு / 5. மாவட்டக் குழு / 6. மாவட்டச் செயற்குழு", 31, 2],
    ["7. வட்ட (தாலுகா), வட்டார (ஏரியா) இடைக்குழுக்கள்", 32, 2], ["8. ஆரம்ப கிளை", 33, 2], ["9. உறுப்பினர் பதிவும், கட்டணப் பகிர்வும்", 33, 2]];
  var starts = []; CH.forEach(function (c) { if (starts.indexOf(c[1]) < 0) starts.push(c[1]); });
  var z = 1, s = 0, cp = 1, busy = false, mode = null;
  var src = function (p) { return p ? DIR + "p" + ("0" + p).slice(-2) + ".webp" : ""; };
  var two = function () { return app.clientWidth >= 900; };
  var S = function () { return two() ? 17 : N; };
  var pagesOf = function (i) { return two() ? (i === 0 ? [0, 1] : [2 * i, 2 * i + 1]) : [0, i + 1]; };
  var spreadOf = function (p) { return two() ? (p === 1 ? 0 : p >> 1) : p - 1; };
  var bms = function () { try { return JSON.parse(localStorage.getItem("dyfi-cb-bm") || "[]"); } catch (e) { return []; } };
  function setImg(slot, p) {
    var im = slot.firstChild;
    if (!p) { slot.hidden = true; return; }
    slot.hidden = false;
    if (!im) { im = new Image(); im.decoding = "async"; im.draggable = false; slot.appendChild(im); }
    var u = src(p); if (im.getAttribute("src") !== u) im.src = u;
    im.alt = "அமைப்புச் சட்டம் பக்கம் " + p;
  }
  function fit() {
    var t = two(), w = view.clientWidth - 32, h = view.clientHeight - 32;
    book.style.setProperty("--pw", Math.max(120, Math.min(t ? w / 2 : w, h / 1.5009)) + "px");
    book.style.setProperty("--z", z); book.classList.toggle("two", t);
  }
  function chapterAt(p, maxLevel) { var r = null; CH.forEach(function (c) { if (c[1] <= p && c[2] <= maxLevel) r = c; }); return r; }
  function ui() {
    var a = pagesOf(s), last = a[1] || a[0], t = two(), lab = (t && a[0] && a[1]) ? a[0] + "–" + a[1] : cp;
    var top = chapterAt(cp, 0), cur = chapterAt(cp, 2);
    ind.innerHTML = "<b>பக்கம் " + lab + " / " + N + "</b><span>" + top[0] + (cur !== top ? " › " + cur[0] : "") + "</span>";
    prog.style.width = (last / N * 100) + "%";
    prev.disabled = s === 0; next.disabled = s >= S() - 1; prevC.disabled = !chPrev(); nextC.disabled = !chNext();
    bm.setAttribute("aria-pressed", bms().indexOf(cp) > -1); openB.hidden = s !== 0;
    if (!panel.hidden) panelBuild(cur);
  }
  function chPrev() { var r = 0; starts.forEach(function (p) { if (p < cp) r = p; }); return r; }
  function chNext() { var last = pagesOf(s)[1] || cp, r = 0; for (var i = 0; i < starts.length; i++) if (starts[i] > last) { r = starts[i]; break; } return r; }
  function panelBuild(cur) {
    var h = ""; CH.forEach(function (c) { h += '<button type="button" class="t' + (c[2] ? " sub" : "") + (c[2] === 2 ? " l2" : "") + (c === cur ? " on" : "") + '" data-p="' + c[1] + '"><span>' + c[0] + '</span><span class="pg">' + c[1] + "</span></button>"; });
    list.innerHTML = h;
    var b = bms().sort(function (x, y) { return x - y; });
    bmList.innerHTML = b.length ? b.map(function (p) { return '<button type="button" class="t" data-p="' + p + '"><span>பக்கம் ' + p + "</span></button>"; }).join("") : '<p class="none">இதுவரை இல்லை. ☆ ஐ அழுத்தி சேர்க்கவும்.</p>';
  }
  function render() {
    var m = two() ? 2 : 1; if (m !== mode) { mode = m; s = spreadOf(cp); }
    s = Math.min(s, S() - 1); var a = pagesOf(s);
    setImg(sl, mode === 2 ? a[0] : 0); setImg(sr, a[1]); cp = a[0] || a[1];
    fit(); book.classList.toggle("closed", s === 0); ui();
    var n = pagesOf(Math.min(s + 1, S() - 1)); [n[0], n[1]].forEach(function (p) { if (p) new Image().src = src(p); });
  }
  function face(p, cls) { var f = d.createElement("div"); f.className = "face " + cls; if (p) { var i = new Image(); i.alt = ""; i.src = src(p); f.appendChild(i); } return f; }
  function go(to) {
    to = Math.max(0, Math.min(S() - 1, to)); if (to === s || busy) return;
    var from = s, fwd = to > from, t = two(), a = pagesOf(from), b = pagesOf(to);
    s = to; if (Math.abs(to - from) !== 1 || reduce) { render(); return; }
    busy = true; var fl = d.createElement("div"), f, k;
    fl.className = "flip " + (fwd ? "fw" : "bw") + (t ? " half" : "");
    if (t) { if (fwd) { f = face(a[1], "f"); k = face(b[0], "b"); setImg(sr, b[1]); } else { f = face(a[0], "f"); k = face(b[1], "b"); setImg(sl, b[0]); } }
    else if (fwd) { f = face(a[1], "f"); k = face(0, "b"); setImg(sr, b[1]); } else { f = face(b[1], "f"); k = face(0, "b"); }
    fl.appendChild(f); fl.appendChild(k); book.appendChild(fl); book.classList.toggle("closed", to === 0);
    void fl.offsetWidth; fl.classList.add("go");
    setTimeout(function () { fl.remove(); busy = false; render(); }, 780);
  }
  var toPage = function (p) { p = Math.max(1, Math.min(N, +p || 1)); if (spreadOf(p) === s) return; busy = false; var to = spreadOf(p); s = to; render(); };
  prev.onclick = function () { go(s - 1); }; next.onclick = function () { go(s + 1); }; sr.onclick = function () { if (s === 0) go(1); }; openB.onclick = function () { go(1); };
  prevC.onclick = function () { toPage(chPrev()); }; nextC.onclick = function () { toPage(chNext()); };
  var zr = $("#cbZr");
  function setZ(v) { var rx = (view.scrollLeft + view.clientWidth / 2) / (view.scrollWidth || 1), ry = (view.scrollTop + view.clientHeight / 2) / (view.scrollHeight || 1); z = Math.max(.75, Math.min(3, Math.round(v * 100) / 100)); fit(); zr.textContent = Math.round(z * 100) + "%"; view.scrollLeft = rx * view.scrollWidth - view.clientWidth / 2; view.scrollTop = ry * view.scrollHeight - view.clientHeight / 2; }
  $("#cbZi").onclick = function () { setZ(z + .25); }; $("#cbZo").onclick = function () { setZ(z - .25); }; zr.onclick = function () { setZ(1); };
  view.addEventListener("wheel", function (e) { if (e.ctrlKey) { e.preventDefault(); setZ(z + (e.deltaY < 0 ? .1 : -.1)); } }, { passive: false });
  bm.onclick = function () { var b = bms(), i = b.indexOf(cp); if (i > -1) b.splice(i, 1); else b.push(cp); try { localStorage.setItem("dyfi-cb-bm", JSON.stringify(b)); } catch (e) {} ui(); };
  $("#cbTocBtn").onclick = function () { panel.hidden = !panel.hidden; this.setAttribute("aria-expanded", !panel.hidden); fit(); ui(); };
  panel.addEventListener("click", function (e) { var b = e.target.closest("[data-p]"); if (!b) return; toPage(b.dataset.p); if (innerWidth < 900) { panel.hidden = true; $("#cbTocBtn").setAttribute("aria-expanded", "false"); fit(); } });
  $("#cbGo").addEventListener("change", function () { toPage(this.value); });
  function fs() {
    var on = !app.classList.contains("full"); app.classList.toggle("full", on); d.documentElement.style.overflow = on ? "hidden" : "";
    if (on && app.requestFullscreen) app.requestFullscreen().catch(function () {}); else if (!on && d.fullscreenElement) d.exitFullscreen().catch(function () {});
    setTimeout(render, 80);
  }
  $("#cbFs").onclick = fs; $("#cbClose").onclick = fs;
  d.addEventListener("fullscreenchange", function () { if (!d.fullscreenElement && app.classList.contains("full")) { app.classList.remove("full"); d.documentElement.style.overflow = ""; render(); } });
  d.addEventListener("keydown", function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "ArrowRight") go(s + 1); else if (e.key === "ArrowLeft") go(s - 1);
    else if (e.key === "Escape" && app.classList.contains("full") && !d.fullscreenElement) fs();
  });
  var tx = 0, ty = 0, pd = 0, pz = 1, pinched = false, dist = function (e) { return Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); };
  view.addEventListener("touchstart", function (e) { if (e.touches.length === 2) { pd = dist(e); pz = z; pinched = true; } else { tx = e.touches[0].clientX; ty = e.touches[0].clientY; pinched = false; } }, { passive: true });
  view.addEventListener("touchmove", function (e) { if (e.touches.length === 2 && pd) { e.preventDefault(); setZ(pz * dist(e) / pd); } }, { passive: false });
  view.addEventListener("touchend", function (e) { if (e.touches.length < 2) pd = 0; if (pinched || z > 1) return; var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(s + (dx < 0 ? 1 : -1)); }, { passive: true });
  $("#cbPrint").onclick = function () {
    var box = d.createElement("div"), jobs = []; box.id = "cbPrintAll";
    for (var p = 1; p <= N; p++) { var i = new Image(); i.alt = ""; i.src = src(p); box.appendChild(i); jobs.push(i.decode ? i.decode().catch(function () {}) : 0); }
    d.body.appendChild(box);
    window.addEventListener("afterprint", function f() { box.remove(); window.removeEventListener("afterprint", f); });
    Promise.all(jobs).then(function () { setTimeout(function () { window.print(); }, 150); });
  };
  var rt; window.addEventListener("resize", function () { cancelAnimationFrame(rt); rt = requestAnimationFrame(render); });
  render();
})();

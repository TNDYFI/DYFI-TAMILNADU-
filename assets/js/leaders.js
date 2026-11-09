/* DYFI Tamil Nadu — renders the Team page from assets/js/leaders-data.js */
(function () {
  "use strict";
  var D = window.DYFI_DATA, $ = function (i) { return document.getElementById(i); };
  if (!D || !$("dgrid")) return;
  var P = "விவரம் விரைவில் புதுப்பிக்கப்படும்", PROFILE = "assets/images/profile.png", SUF = " மாவட்டம்";
  var SVG = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#e5e7eb"/><circle cx="50" cy="38" r="17" fill="#9ca3af"/><path d="M14 100c2-26 18-38 36-38s34 12 36 38z" fill="#9ca3af"/></svg>');
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function digits(v) { return String(v || "").replace(/[\s-]/g, "").replace(/^\+/, ""); }
  function ok(v) { return /^(91)?\d{10}$/.test(digits(v)); }
  function ten(v) { var d = digits(v); return d.length === 12 ? d.slice(2) : d; }
  function tel(v) { return "tel:+91" + ten(v); }
  function wa(v) { return "https://wa.me/91" + ten(v); }
  function img(src, alt) {
    var i = new Image(); i.alt = alt || ""; i.width = 80; i.height = 80; i.loading = "lazy"; i.decoding = "async";
    i.onerror = function () { i.onerror = function () { i.onerror = null; i.src = SVG; }; i.src = PROFILE; };
    i.src = src || PROFILE; return i;
  }
  function act(icon, label, href, cls) {
    var a = el("a", "pp-a " + cls); a.href = href; a.title = label; a.setAttribute("aria-label", label);
    if (cls === "wa") { a.target = "_blank"; a.rel = "noopener"; }
    a.innerHTML = '<i class="' + icon + '" aria-hidden="true"></i>'; return a;
  }
  function person(r, big) {
    var w = el("div", "pp"), av = el("span", "pp-av" + (big ? " big" : "")), b = el("div", "pp-b");
    av.appendChild(img(r.photo, r.name || r.role));
    b.appendChild(el("div", "pp-n" + (r.name ? "" : " pend"), r.name || P)); b.appendChild(el("div", "pp-r", r.role));
    if (r.name && ok(r.phone)) {
      var c = el("div", "pp-c"), n = el("a", "pp-t", r.phone); n.href = tel(r.phone);
      c.appendChild(n); c.appendChild(act("fa-solid fa-phone", "அழைக்க " + r.phone, tel(r.phone), "call")); c.appendChild(act("fa-brands fa-whatsapp", "WhatsApp " + r.phone, wa(r.phone), "wa")); b.appendChild(c);
    }
    w.appendChild(av); w.appendChild(b); return w;
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" }) : null;
  if (io) document.documentElement.classList.add("js-rv");
  function reveal(n, i) { n.classList.add("rv"); n.style.setProperty("--d", (i % 4) * 70 + "ms"); if (io) io.observe(n); }
  function card(r, i) { var c = el("div", "pc"); c.appendChild(person(r, true)); reveal(c, i); return c; }
  D.stateLeadership.forEach(function (r, i) { $("stLead").appendChild(card(r, i)); });
  D.stateExecutive.forEach(function (r, i) { $("stExec").appendChild(card(r, i)); });
  var filled = 0, pend = 0, named = D.stateLeadership.concat(D.stateExecutive).filter(function (r) { return r.name; }).length;
  var g = $("dgrid"), q = $("dq");
  var cards = D.districts.map(function (d, n) {
    var a = el("article", "dcx"), h = el("h3");
    h.appendChild(el("span", "", d.name + SUF)); h.appendChild(el("small", "", ("0" + (n + 1)).slice(-2)));
    [d.president, d.secretary].forEach(function (p) { if (p.name) filled++; else pend++; });
    a.appendChild(h);
    a.appendChild(person({ name: d.president.name, role: "மாவட்ட தலைவர்", phone: d.president.phone, photo: d.president.photo }, false));
    a.appendChild(person({ name: d.secretary.name, role: "மாவட்ட செயலாளர்", phone: d.secretary.phone, photo: d.secretary.photo }, false));
    a._k = (d.name + SUF + " " + d.president.name + " " + d.secretary.name).toLowerCase(); reveal(a, n); g.appendChild(a); return a;
  });
  $("cDist").textContent = cards.length; $("cAvail").textContent = named + filled; $("cPend").textContent = pend;
  function find() { var s = q.value.trim().toLowerCase(), n = 0; cards.forEach(function (c) { var m = !s || c._k.indexOf(s) > -1; c.hidden = !m; if (m) { n++; c.classList.add("in"); } }); $("dcount").textContent = n ? n + " / " + cards.length + " மாவட்டங்கள் காட்டப்படுகின்றன" : "பொருந்தும் மாவட்டம் அல்லது பெயர் இல்லை."; }
  q.addEventListener("input", find); find();
})();

/* DYFI Tamil Nadu — renders state + district leadership from assets/js/leaders-data.js */
(function () {
  "use strict";
  var SET = "assets/set.png", PH0 = "1234567890", DATA = window.DYFI_DATA, P = "விவரம் விரைவில் புதுப்பிக்கப்படும்", SUF = " மாவட்டம்", $ = function (i) { return document.getElementById(i); };
  if (!DATA || !$("dgrid")) return;
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  var K = [["whatsapp", "fa-brands fa-whatsapp", "WhatsApp", function (v) { return "https://wa.me/" + v.replace(/\D/g, ""); }], ["email", "fa-solid fa-envelope", "மின்னஞ்சல்", function (v) { return "mailto:" + v; }], ["instagram", "fa-brands fa-instagram", "Instagram", String], ["facebook", "fa-brands fa-facebook-f", "Facebook", String], ["x", "fa-brands fa-x-twitter", "X", String]];
  function valid(v) { var d = String(v || "").replace(/\D/g, ""); return d.length >= 10 && d !== PH0 && !/^(\d)\1+$/.test(d); }
  function waHref(v) { var d = String(v).replace(/\D/g, ""); if (d.length === 10) d = "91" + d; return "https://wa.me/" + d; }
  function phone(r, lead, cls) {
    var p = el("p", cls || "sc-tel"); if (lead) p.appendChild(document.createTextNode(lead));
    if (valid(r.phone)) { var t = el("a", "", r.phone); t.href = "tel:" + r.phone.replace(/[^\d+]/g, ""); p.appendChild(t); var w = el("a", "si wa"); w.href = waHref(r.phone); w.target = "_blank"; w.rel = "noopener"; w.title = "WhatsApp"; w.setAttribute("aria-label", "WhatsApp"); w.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>'; p.appendChild(w); }
    else p.appendChild(el("span", "ph0", PH0));
    return p;
  }
  function links(r) {
    var d = el("div", "socs");
    K.forEach(function (k) { var v = r && r[k[0]]; if (!v) return; var a = el("a", "si"); a.href = k[3](String(v).trim()); a.title = k[2]; a.setAttribute("aria-label", k[2]); a.innerHTML = '<i class="' + k[1] + '" aria-hidden="true"></i>'; if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; } d.appendChild(a); });
    return d.children.length ? d : null;
  }
  function sCard(r, big) {
    var a = el("article", "sc" + (big ? " big" : "")), ph = el("div", "sc-ph"), b = el("div", "sc-b");
    var i = new Image(); i.src = r.photo || SET; i.alt = r.name || r.role; i.loading = "lazy"; i.width = 400; i.height = 400; ph.appendChild(i);
    b.appendChild(el("h3", "", r.name || P)); b.appendChild(el("span", "role", r.role));
    if (r.about) b.appendChild(el("p", "sc-about", r.about));
    b.appendChild(phone(r, "தொடர்பு எண்: "));
    var l = links(r); if (l) b.appendChild(l); a.appendChild(ph); a.appendChild(b); return a;
  }
  DATA.state.forEach(function (r) { $("stPrimary").appendChild(sCard(r, true)); });
  DATA.stateMembers.forEach(function (r) { $("stOthers").appendChild(sCard(r, false)); });
  (DATA.stateExecutive || []).forEach(function (r) { $("stExec").appendChild(sCard(r, false)); });
  if (!(DATA.stateExecutive || []).length) { var ex = $("stExec"); ex.className = "st-note"; ex.textContent = "மாநிலச் செயற்குழு உறுப்பினர் விவரங்கள் விரைவில் புதுப்பிக்கப்படும்."; }
  var ROLES = ["மாவட்ட தலைவர்", "மாவட்ட செயலாளர்", "மாவட்டக்குழு உறுப்பினர் 1", "மாவட்டக்குழு உறுப்பினர் 2"];
  function row(r) {
    var m = el("div", "mrow"), av = el("span", "av"), b = el("div", "mb");
    var i = new Image(); i.src = r.photo || SET; i.alt = r.name || r.role; i.loading = "lazy"; i.width = 84; i.height = 84; av.appendChild(i);
    b.appendChild(el("div", "mn" + (r.name ? "" : " pend"), r.name || P)); b.appendChild(el("div", "mr", r.role));
    if (r.about) b.appendChild(el("div", "mi", r.about));
    b.appendChild(phone(r, "", "mi"));
    var l = links(r); if (l) b.appendChild(l); m.appendChild(av); m.appendChild(b); return m;
  }
  var g = $("dgrid"), q = $("dq"), filled = 0;
  var cards = DATA.districts.map(function (d, n) {
    var o = d[3] || {}, mem = (o.members || []);
    var people = [Object.assign({ name: d[1], role: ROLES[0] }, o.president), Object.assign({ name: d[2], role: ROLES[1] }, o.secretary), Object.assign({ name: "", role: ROLES[2] }, mem[0]), Object.assign({ name: "", role: ROLES[3] }, mem[1])];
    if (d[1]) filled++; if (d[2]) filled++;
    var a = el("article", "dc"), h = el("button", "dc-h"), body = el("div", "dc-b"), inn = el("div", "dc-in"), id = "dc" + n;
    h.type = "button"; h.setAttribute("aria-expanded", "false"); h.setAttribute("aria-controls", id);
    h.innerHTML = '<span class="dno">' + ("0" + (n + 1)).slice(-2) + '</span><span class="dn"></span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>'; h.querySelector(".dn").textContent = d[0] + SUF;
    body.id = id;
    var c = o.contact || {}, tel = null;
    if (o.about || Object.keys(c).some(function (k) { return c[k]; })) {
      var ct = el("div", "dc-ct"); if (o.about) ct.appendChild(el("p", "dc-about", o.about));
      if (c.phone) { tel = el("p", "sc-tel", "தொடர்பு எண்: "); var t = el("a", "", c.phone); t.href = "tel:" + c.phone.replace(/[^\d+]/g, ""); tel.appendChild(t); ct.appendChild(tel); }
      var l = links(c); if (l) ct.appendChild(l); inn.appendChild(ct);
    }
    people.forEach(function (p) { inn.appendChild(row(p)); });
    body.appendChild(inn); a.appendChild(h); a.appendChild(body);
    h.addEventListener("click", function () { var open = a.classList.toggle("open"); h.setAttribute("aria-expanded", open); });
    a._k = (d[0] + SUF + " " + people.map(function (p) { return p.name; }).join(" ")).toLowerCase(); g.appendChild(a); return a;
  });
  var named = DATA.state.filter(function (r) { return r.name; }).length;
  $("cDist").textContent = cards.length; $("cAvail").textContent = named + filled; $("cPend").textContent = cards.length * 2 - filled;
  function find() { var s = q.value.trim().toLowerCase(), n = 0; cards.forEach(function (c) { var ok = !s || c._k.indexOf(s) > -1; c.hidden = !ok; if (ok) n++; }); $("dcount").textContent = n ? n + " / " + cards.length + " மாவட்டங்கள் காட்டப்படுகின்றன" : "பொருந்தும் மாவட்டம் அல்லது பெயர் இல்லை."; }
  q.addEventListener("input", find); find();
})();

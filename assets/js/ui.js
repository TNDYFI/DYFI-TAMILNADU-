/* DYFI Tamil Nadu — shell behaviour: desktop collapse, active link, page search */
(function () {
  "use strict";
  var d = document, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var me = d.currentScript, base = me ? me.src.replace(/assets\/js\/ui\.js.*$/, "") : "./", wide = function () { return window.innerWidth >= 992; };
  try { if (wide() && localStorage.getItem("dyfi-sb") === "1") d.body.classList.add("sb-collapsed"); } catch (e) {}
  var btn = $("#menuBtn"), side = $("#side");
  if (btn) btn.addEventListener("click", function () {
    if (!wide()) return;
    var c = d.body.classList.toggle("sb-collapsed"); try { localStorage.setItem("dyfi-sb", c ? "1" : "0"); } catch (e) {}
    btn.setAttribute("aria-expanded", !c);
  }, true);
  var sc = $("#sideClose"); if (sc && btn) sc.addEventListener("click", function () { if (side.classList.contains("open")) btn.click(); });
  var cur = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (cur !== "index.html") $$("#side nav a[href]").forEach(function (a) { var h = a.getAttribute("href"); if (h.charAt(0) !== "#" && h.toLowerCase().split("/").pop() === cur) { a.classList.add("active"); a.setAttribute("aria-current", "page"); } });
  /* search */
  var P = [["முகப்பு", "DYFI தமிழ்நாடு - சேவைகள், அறிமுகம், உறுப்பினர் விபரம்", "index.html"], ["DYFI பற்றி", "அமைப்பு பற்றிய தகவல்கள்", "about.html"], ["நிர்வாகிகள்", "மாநில மற்றும் 41 மாவட்ட நிர்வாகிகள்", "team.html"], ["படத்தொகுப்பு", "DYFI படங்கள்", "gallery.html"], ["இணைந்திட", "உறுப்பினர் / தன்னார்வலர் படிவம்", "careers.html"], ["தொடர்புகொள்ள", "முகவரி, தொலைபேசி, மின்னஞ்சல்", "contact.html"], ["அமைப்பு சட்டம்", "திட்டம் மற்றும் அமைப்புச் சட்டம் - PDF பதிவிறக்கம்", "constitution.html"], ["Chatbot Query", "கேள்விகள் - DYFI Chatbot", "chatbot.html"], ["அடிக்கடி கேட்கப்படும் கேள்விகள்", "FAQ", "terms/faq.html"], ["விதிமுறைகள் மற்றும் நிபந்தனைகள்", "Terms and Conditions", "terms/tac.html"]];
  var dlg = $("#searchDlg"), sb = $("#searchBtn"); if (!dlg || !sb) return;
  var inp = $("input", dlg), out = $(".ui-rs", dlg);
  function list() {
    var q = inp.value.trim().toLowerCase(); out.textContent = "";
    P.filter(function (p) { return !q || (p[0] + " " + p[1]).toLowerCase().indexOf(q) > -1; }).forEach(function (p) {
      var a = d.createElement("a"); a.className = "ui-r"; a.href = base + p[2]; a.innerHTML = "<strong></strong><span></span>"; a.firstChild.textContent = p[0]; a.lastChild.textContent = p[1]; out.appendChild(a);
    });
    if (!out.firstChild) { var n = d.createElement("p"); n.textContent = "பொருந்தும் பக்கம் இல்லை."; out.appendChild(n); }
  }
  sb.addEventListener("click", function () { inp.value = ""; list(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); inp.focus(); });
  $(".ui-x", dlg).addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  inp.addEventListener("input", list);
})();

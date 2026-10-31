/* DYFI Tamil Nadu — app layer (vanilla JS): theme, progress, PWA, forms, district finder */
(function () {
  "use strict";
  var d = document, R = d.documentElement, $ = function (s, r) { return (r || d).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var me = d.currentScript, base = me ? me.src.replace(/assets\/js\/app\.js.*$/, "") : "./";
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function toast(msg) {
    var t = $(".toast") || d.body.appendChild(Object.assign(d.createElement("div"), { className: "toast", role: "status" }));
    t.textContent = msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 3200);
  }

  /* Reading progress */
  var bar = d.body.appendChild(Object.assign(d.createElement("div"), { id: "pgbar" })); bar.setAttribute("aria-hidden", "true");
  window.addEventListener("scroll", function () { var h = R.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (h > 0 ? Math.min(scrollY / h, 1) : 0) + ")"; }, { passive: true });

  /* Sidebar actions: day/night mode + install */
  var ul = $("#side nav ul");
  function navBtn(icon, label) {
    var li = d.createElement("li"); li.innerHTML = '<a href="#" role="button"><i class="fa-solid ' + icon + '" aria-hidden="true"></i><span>' + label + "</span></a>";
    ul.appendChild(li); li.firstChild.addEventListener("click", function (e) { e.preventDefault(); }); return li;
  }
  if (ul) {
    var tb = navBtn("fa-circle-half-stroke", "இரவு / பகல் பயன்முறை").firstChild;
    var sync = function () { tb.setAttribute("aria-pressed", R.getAttribute("data-theme") === "dark"); };
    tb.addEventListener("click", function () { var n = R.getAttribute("data-theme") === "dark" ? "light" : "dark"; R.setAttribute("data-theme", n); save("dyfi-theme", n); sync(); });
    sync();
    var inst = navBtn("fa-download", "செயலியாக நிறுவு"), ev; inst.hidden = true;
    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); ev = e; inst.hidden = false; });
    inst.firstChild.addEventListener("click", function () { if (ev) { ev.prompt(); ev = null; inst.hidden = true; } });
    window.addEventListener("appinstalled", function () { inst.hidden = true; });
  }

  /* Offline / online notice + service worker */
  window.addEventListener("offline", function () { toast("இணைய இணைப்பு இல்லை"); });
  window.addEventListener("online", function () { toast("மீண்டும் இணைக்கப்பட்டது"); });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) window.addEventListener("load", function () { navigator.serviceWorker.register(base + "sw.js").catch(function () {}); });

  /* Forms: validation, inline errors, in-page submit (no redirect away from the site/WebView) */
  var MSG = { req: "இந்தப் புலம் தேவை.", mail: "சரியான மின்னஞ்சலை உள்ளிடவும்.", tel: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.", ok: "நன்றி! உங்கள் விவரங்கள் அனுப்பப்பட்டன.", bad: "அனுப்ப முடியவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயலுங்கள் அல்லது info@tndyfi.com க்கு மின்னஞ்சல் அனுப்புங்கள்.", wait: "அனுப்புகிறது…" };
  var AC = { name: "name", email: "email", contactNum: "tel" };
  $$("form[action*='web3forms']").forEach(function (f) {
    f.noValidate = true;
    var fields = $$("input:not([type=hidden]),select,textarea", f), btn = $("button[type=submit]", f), label = btn.innerHTML;
    f.insertAdjacentHTML("afterbegin", '<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display:none">');
    var st = d.createElement("div"); st.className = "fstatus"; st.setAttribute("role", "status"); st.setAttribute("aria-live", "polite"); btn.parentNode.parentNode.insertBefore(st, btn.parentNode);
    fields.forEach(function (el) {
      var l = el.getAttribute("placeholder") || (el.options && el.options[0].text) || "";
      el.setAttribute("aria-label", l.replace("*", "").trim()); if (el.required) el.setAttribute("aria-required", "true");
      if (AC[el.name]) el.setAttribute("autocomplete", AC[el.name]);
      el.addEventListener("input", function () { mark(el, ""); });
    });
    function mark(el, m) {
      var e = el.parentNode.querySelector(".ferr");
      if (!m) { if (e) e.remove(); el.classList.remove("is-invalid"); el.removeAttribute("aria-invalid"); return; }
      if (!e) { e = d.createElement("span"); e.className = "ferr"; e.id = (el.id || el.name) + "-err"; el.parentNode.appendChild(e); }
      e.textContent = m; el.classList.add("is-invalid"); el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", e.id);
    }
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var bad = null;
      fields.forEach(function (el) {
        var v = el.value.trim(), m = "";
        if (el.required && !v) m = MSG.req;
        else if (v && el.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) m = MSG.mail;
        else if (v && el.type === "tel" && !/^\+?[\d\s-]{7,16}$/.test(v)) m = MSG.tel;
        mark(el, m); if (m && !bad) bad = el;
      });
      if (bad) { st.className = "fstatus"; st.textContent = ""; bad.focus(); return; }
      btn.disabled = true; btn.innerHTML = '<span class="spin" aria-hidden="true"></span>' + MSG.wait;
      fetch(f.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (!j.success) throw 0; f.reset(); st.className = "fstatus ok"; st.textContent = MSG.ok; })
        .catch(function () { st.className = "fstatus bad"; st.textContent = MSG.bad; })
        .then(function () { btn.disabled = false; btn.innerHTML = label; st.scrollIntoView({ block: "center", behavior: "smooth" }); });
    });
  });

  /* District finder: search + sort over the existing member list */
  var box = $("#district-scroll-box");
  if (box) {
    var bar2 = d.createElement("div"); bar2.className = "dfind";
    bar2.innerHTML = '<label class="sr" for="dq">மாவட்டத்தைத் தேடுக</label><input id="dq" type="search" placeholder="மாவட்டத்தைத் தேடுக" autocomplete="off"><button type="button" data-s="o" aria-pressed="true">வரிசைப்படி</button><button type="button" data-s="n" aria-pressed="false">அதிக உறுப்பினர்</button>';
    box.parentNode.insertBefore(bar2, box);
    var none = d.createElement("p"); none.className = "dnone"; none.hidden = true; none.textContent = "பொருந்தும் மாவட்டம் இல்லை."; box.parentNode.appendChild(none);
    var q = $("#dq", bar2), rows = function () { return $$(".dist-row", box); };
    function filter() {
      var s = q.value.trim().toLowerCase(), n = 0;
      rows().forEach(function (r) { var ok = !s || r.firstChild.textContent.toLowerCase().indexOf(s) > -1; r.hidden = !ok; if (ok) n++; });
      none.hidden = n > 0;
    }
    q.addEventListener("input", filter);
    $$("button", bar2).forEach(function (b) {
      b.addEventListener("click", function () {
        var r = rows(); r.forEach(function (x, i) { if (x.dataset.o === undefined) x.dataset.o = i; });
        var key = b.dataset.s === "n" ? function (x) { return -x.lastChild.dataset.count; } : function (x) { return +x.dataset.o; };
        r.sort(function (a, c) { return key(a) - key(c); }).forEach(function (x) { box.appendChild(x); });
        $$("button", bar2).forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
        box.scrollTop = 0;
      });
    });
  }
})();

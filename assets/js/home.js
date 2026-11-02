/* DYFI Tamil Nadu — home page YouTube cards (data: assets/js/videos-data.js) */
(function () {
  "use strict";
  var g = document.getElementById("ytGrid"), V = window.DYFI_VIDEOS || [];
  function vid(u) {
    try {
      var x = new URL(u), h = x.hostname.replace(/^(www|m)\./, ""), id = "";
      if (h === "youtu.be") id = x.pathname.slice(1).split("/")[0];
      else if (h.indexOf("youtube") > -1) id = x.searchParams.get("v") || (x.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/) || [])[1] || "";
      return /^[\w-]{11}$/.test(id) ? id : "";
    } catch (e) { return ""; }
  }
  window.DYFI_ytId = vid;
  if (!g) return;
  V.slice(0, 3).forEach(function (v) {
    var a = document.createElement("a"), th = document.createElement("div"), id = vid(v.url), pl = document.createElement("span");
    a.className = "yt-card"; a.href = v.url; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", (v.title || "YouTube") + " - YouTube-இல் பார்க்க");
    th.className = "yt-th";
    if (id) { var i = new Image(); i.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; i.alt = v.title || "YouTube வீடியோ"; i.loading = "lazy"; i.decoding = "async"; i.width = 480; i.height = 360; th.appendChild(i); }
    else { var ph = document.createElement("b"); ph.className = "yt-ph"; ph.textContent = "YouTube"; th.appendChild(ph); }
    pl.className = "yt-play"; pl.setAttribute("aria-hidden", "true"); th.appendChild(pl); a.appendChild(th);
    if (v.title || v.desc) { var b = document.createElement("div"); b.className = "yt-b"; if (v.title) { var h = document.createElement("h3"); h.textContent = v.title; b.appendChild(h); } if (v.desc) { var p = document.createElement("p"); p.textContent = v.desc; b.appendChild(p); } a.appendChild(b); }
    g.appendChild(a);
  });
})();

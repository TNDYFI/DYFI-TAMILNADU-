/* Firebase WEB config (public identifiers, safe to ship in frontend code).
   Fill these from Firebase Console > Project settings > General > Your apps > Web app.
   Never put a service-account / Admin SDK key here. Leave as-is until configured:
   the homepage then shows "—" instead of any visitor number. */
window.DYFI_FIREBASE = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",   // e.g. https://YOUR-PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app
  projectId: "",
  appId: ""
};
/* Optional: path of the counter in Realtime Database */
window.DYFI_COUNTER_PATH = "stats/visitors";

/* Safety net: if the Firebase SDK cannot load (offline / blocked), stop the spinner and show "—" (never a fake number). */
setTimeout(function () {
  var c = document.getElementById("visitorCount"), n = document.getElementById("visitorNote");
  if (c && c.dataset.state === "loading") { c.dataset.state = "error"; c.textContent = "—"; if (n) { n.hidden = false; n.textContent = "இணைப்புப் பிழை"; } }
}, 10000);

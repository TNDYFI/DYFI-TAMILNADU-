/* DYFI Tamil Nadu — real-time visitor counter (Firebase Realtime Database, modular SDK via CDN).
   - Reads the live total and updates the page when it changes.
   - Counts one visit per browser session (sessionStorage), using an atomic server-side increment.
   - Never shows a made-up number: loading spinner, then the real value, or "—" on any error. */
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue, set, increment } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const el = document.getElementById("visitorCount"), note = document.getElementById("visitorNote");
const cfg = window.DYFI_FIREBASE || {}, path = window.DYFI_COUNTER_PATH || "stats/visitors";
const KEY = "dyfi-visit-counted";

function fail(msg) {
  if (!el) return;
  el.dataset.state = "error"; el.textContent = "—";
  if (note) { note.hidden = false; note.textContent = msg; }
}
function show(n) {
  if (!el) return;
  el.dataset.state = "ok"; el.textContent = Number(n).toLocaleString("en-IN");
  if (note) note.hidden = true;
}

(function main() {
  if (!el) return;
  if (!cfg.apiKey || !cfg.databaseURL || !cfg.projectId || !cfg.appId) { fail("Firebase அமைக்கப்படவில்லை"); return; }
  try {
    const app = getApps().length ? getApp() : initializeApp(cfg);   // never initialise twice
    const db = getDatabase(app), counter = ref(db, path);

    // live value
    onValue(counter, snap => {
      const v = snap.val();
      if (typeof v === "number") show(v); else fail("எண்ணிக்கை கிடைக்கவில்லை");
    }, () => fail("இணைப்புப் பிழை"));

    // count this session once (atomic server-side increment; rules only allow +1)
    let counted = false;
    try { counted = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
    if (!counted) {
      set(counter, increment(1)).then(() => { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} }).catch(() => {});
    }
  } catch (e) { fail("இணைப்புப் பிழை"); }
})();

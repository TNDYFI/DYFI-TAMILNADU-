# Firebase visitor counter — setup (free Spark plan, no Cloud Function needed)

1. console.firebase.google.com → Add project (or use your existing one).
2. Build → Realtime Database → Create database → choose a region → **Locked mode** (not test mode).
3. Rules tab → paste firebase/database.rules.json → Publish.
4. Data tab → add node `stats` → child `visitors` = your starting number (a real number; it must exist, the rules only allow +1).
5. Project settings → General → Your apps → Add Web app → copy the config into assets/js/firebase-config.js
   (apiKey, authDomain, databaseURL, projectId, appId).
6. Project settings → Authorized domains: make sure dyfitamilnadu.org (and tndyfi.github.io) are listed.
7. Upload the site; open the homepage in a new tab: the number increases by 1 once per browser session.

Security note: the rules let anyone READ the count and only add exactly +1 (no overwrite/reset).
A determined script can still add +1 repeatedly. For stricter protection use firebase/OPTIONAL-cloud-function-index.js
(requires Blaze billing — NOT enabled; do it only if you approve) plus App Check, then set ".write": false.

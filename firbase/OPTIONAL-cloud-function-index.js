/* OPTIONAL stronger setup (needs Blaze plan). Copy into functions/index.js, then set rules to ".write": false
   and have the page call this endpoint instead of writing directly. Admin SDK runs server-side only. */
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
exports.countVisit = onRequest({ cors: ["https://dyfitamilnadu.org"], region: "asia-south1" }, async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  await admin.database().ref("stats/visitors").transaction(v => (v || 0) + 1);
  res.status(204).end();
});

// you will need to install via 'npm install jsonwebtoken' or in your package.json

const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "https://morada-uno.metabaseapp.com";
const METABASE_SECRET_KEY = "9d251d24778c7db3433b6263ec7f5f9243fe960370cee39cbcf461deddc4e618";

const payload = {
  resource: { question: 8944 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
const token = jwt.sign(payload, METABASE_SECRET_KEY);

const iframeUrl = METABASE_SITE_URL + "/embed/question/" + token +
  "#bordered=true&titled=true";
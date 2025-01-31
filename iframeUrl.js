// you will need to install via 'npm install jsonwebtoken' or in your package.json

const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "https://morada-uno.metabaseapp.com";
const METABASE_SECRET_KEY =  METABASE_SECRET_KEY;


const payload = {
  resource: { question: 8944 },
  params: {},
  exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
const token = jwt.sign(payload, METABASE_SECRET_KEY);

const iframeUrl = METABASE_SITE_URL + "/embed/question/" + token +
  "#bordered=true&titled=true";

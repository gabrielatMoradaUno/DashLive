const jwt = require("jsonwebtoken");

const METABASE_SITE_URL = "https://morada-uno.metabaseapp.com";
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY; // ✅ Se toma de variables de entorno

export default function handler(req, res) {
    if (!METABASE_SECRET_KEY) {
        return res.status(500).json({ error: "Falta la clave secreta de Metabase" });
    }

    const payload = {
        resource: { question: 8944 }, // Cambia el ID si es otro dashboard
        params: {},
        exp: Math.round(Date.now() / 1000) + (10 * 60) // Expira en 10 minutos
    };

    try {
        const token = jwt.sign(payload, METABASE_SECRET_KEY);
        const iframeUrl = `${METABASE_SITE_URL}/embed/question/${token}#bordered=true&titled=true`;

        res.json({ iframeUrl });
    } catch (error) {
        res.status(500).json({ error: "Error al generar el token" });
    }
}

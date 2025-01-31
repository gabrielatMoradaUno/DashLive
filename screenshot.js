const puppeteer = require('puppeteer');

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Configura el viewport para la captura
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        // Reemplaza esta URL con la URL pública de tu dashboard de Metabase
        await page.goto('https://morada-uno.metabaseapp.com/public/dashboard/347ac500-f1b8-4672-aca2-c6c05bc9e280', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Espera adicional para asegurar que todo el contenido esté cargado
        await page.waitForTimeout(5000);

        // Toma la captura de pantalla
        await page.screenshot({
            path: 'dashboard.png',
            fullPage: true
        });

        console.log('Screenshot taken successfully!');
    } catch (error) {
        console.error('Error taking screenshot:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

takeScreenshot();
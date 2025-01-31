const puppeteer = require('puppeteer');

async function takeScreenshot() {
    let browser = null;

    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ],
            defaultViewport: {
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
            }
        });

        const page = await browser.newPage();
        
        console.log('Navigating to page...');
        await page.goto('TU_URL_DE_METABASE', {
            waitUntil: ['networkidle0', 'domcontentloaded'],
            timeout: 60000
        });

        console.log('Waiting for content to stabilize...');
        // Espera usando setTimeout
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Taking screenshot...');
        await page.screenshot({
            path: 'dashboard.png',
            fullPage: true,
            quality: 100
        });

        console.log('Screenshot taken successfully!');
    } catch (error) {
        console.error('Error during screenshot process:', error);
        process.exit(1);
    } finally {
        if (browser) {
            console.log('Closing browser...');
            await browser.close();
        }
    }
}

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});

console.log('Starting screenshot process...');
takeScreenshot();

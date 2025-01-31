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
                deviceScaleFactor: 3,  // Captura en alta resolución
            }
        });

        const page = await browser.newPage();

        console.log('Enabling cache for better performance...');
        await page.setCacheEnabled(true);

        console.log('Navigating to dashboard...');
        await page.goto('https://morada-uno.metabaseapp.com/public/dashboard/b11bf7dc-7159-4d29-8a98-1703f8c6fff2', {
            waitUntil: ['networkidle2', 'domcontentloaded'],
            timeout: 90000  // Aumentamos el tiempo de espera
        });

        console.log('Waiting for body to load...');
        await page.waitForSelector('body', { visible: true, timeout: 90000 });

        console.log('Extra waiting time for full rendering...');
        await new Promise(resolve => setTimeout(resolve, 15000)); // Reemplazo de waitForTimeout()

        console.log('Taking high-quality screenshot...');
        await page.screenshot({
            path: 'dashboard.png',
            fullPage: true,
            type: 'png'
        });

        console.log('Screenshot saved successfully!');
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

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    process.exit(1);
});

console.log('Starting screenshot process...');
takeScreenshot();

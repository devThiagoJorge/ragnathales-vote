const puppeteer = require('puppeteer');
require("dotenv").config();

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    console.warn(process.env.EMAIL);
    const page = await browser.newPage();
    await page.goto('https://www.ragnatales.com.br/profile/login');
    await page.waitForSelector('input.appearance-none.rounded-xl');
    await page.type('input.appearance-none.rounded-xl', process.env.EMAIL);
    await page.waitForSelector('input[placeholder="Digite sua senha de acesso"]');
    await page.type('input[placeholder="Digite sua senha de acesso"]', process.env.PASSWORD);

    await page.waitForSelector('button[type="submit"]');

    await page.evaluate(() => {
        const button = document.querySelector('button[type="submit"]');
        button.disabled = false;
    });

    await page.click('button[type="submit"]');

    // Espera pelo carregamento do link específico
    await page.waitForSelector('a[href="/profile/vote"]');

    // Clica no link
    await page.click('a[href="/profile/vote"]');

    await page.waitForSelector('button.rounded-xl.text-center.transition.ease-in-out.disabled\\:cursor-not-allowed.disabled\\:opacity-70.px-4.py-2.text-base.text-white.bg-primary.active\\:bg-blue-800.block.w-full');

    // Clica no botão
    await page.click('button.rounded-xl.text-center.transition.ease-in-out.disabled\\:cursor-not-allowed.disabled\\:opacity-70.px-4.py-2.text-base.text-white.bg-primary.active\\:bg-blue-800.block.w-full');

})();
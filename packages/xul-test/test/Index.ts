import puppeteer from "puppeteer-core";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com", { waitUntil: "networkidle2" });
  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
})();

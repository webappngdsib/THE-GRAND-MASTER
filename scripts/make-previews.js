// Δημιουργεί στιγμιότυπα (previews/<slug>.jpg) για κάθε έργο του πίνακα WORKS στο index.html.
// Χρήση: node scripts/make-previews.js            (όλα)
//        node scripts/make-previews.js amity       (μόνο όσα ταιριάζουν στο κείμενο)
// Απαιτεί Playwright με Chromium.
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "index.html"), "utf8");
const WORKS = eval(src.match(/const WORKS = (\[[\s\S]*?\n  \]);/)[1]);
// Ίδιες συναρτήσεις με το index.html
const liveOf = w => w.live || (w.repo ? `https://${w.repo.split("/")[0]}.github.io/${w.repo.split("/")[1]}/` : null);
const slugOf = w => {
  const u = new URL(liveOf(w));
  const last = u.pathname.split("/").filter(Boolean).pop();
  const base = w.repo ? w.repo.replace("/", "-") : (last ? last.replace(/\.[a-z]+$/i, "") : u.hostname.split(".")[0]);
  return base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};

(async () => {
  const filter = (process.argv[2] || "").toLowerCase();
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ proxy });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 0.5, ignoreHTTPSErrors: !!proxy });
  fs.mkdirSync(path.join(root, "previews"), { recursive: true });
  for (const w of WORKS) {
    const url = liveOf(w);
    if (!url) continue;
    const slug = slugOf(w);
    if (filter && !`${slug} ${w.t}`.toLowerCase().includes(filter)) continue;
    const page = await ctx.newPage();
    try {
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => null);
      const status = res ? res.status() : 0;
      if (status !== 200) { console.log(`skip ${status}\t${slug}\t${url}`); continue; }
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(root, "previews", `${slug}.jpg`), type: "jpeg", quality: 72 });
      console.log(`ok\t${slug}`);
    } catch (e) {
      console.log(`fail\t${slug}\t${e.message.split("\n")[0]}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();

// gen.ts
import "./setup"; // Сначала эмулируем DOM
import fs from "fs";

import { renderToString } from "@solenopsys/converged-renderer";
import { Page } from "./page";

async function renderPage(mdArray, out) {
  // Генерируем HTML-строку асинхронно
  const pageMarkup = await renderToString(Page(mdArray));
  const html = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Тестовая страница</title>
    <style>
      .page { max-width: 800px; margin: 0 auto; padding: 20px; }
      .content { line-height: 1.6; }
    </style>
  </head>
  <body>
    ${pageMarkup}
  </body>
</html>`;


  fs.writeFileSync(out, html);
  console.log("Страница сгенерирована: page.html");
}

renderPage([
  "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/applied.md",
"/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/difference.md"
], "page.html").catch(console.error);

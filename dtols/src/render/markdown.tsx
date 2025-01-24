import { marked } from "marked";
import fs from "fs";

export function Markdown({ url }: { url: string }) {
  console.log("MARKDOWN", url);

  // Синхронно читаем файл как текст (Node.js-способ)
  const text = fs.readFileSync(url, "utf8");
  console.log("TEXT", text);

  // Парсим Markdown в HTML
  const html = marked.parse(text);
  console.log("HTML", html);

  // Рендерим готовый HTML
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
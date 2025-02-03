import { marked } from "marked";
import { readFile } from "@fileio";

export function Markdown({ url }: { url: string }) {
  const text = readFile(url);
  const html = marked.parse(text);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
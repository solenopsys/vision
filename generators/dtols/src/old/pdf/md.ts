

const html = await Bun.file("./index.html").text();

function injectedHtml(html: string, md: string) {

// Read Markdown content from a file
const markdownContent = await Bun.file(md).text();

// Convert Markdown to HTML
const htmlContent = await marked(markdownContent);

const injectedHtml = html.replace("{{content}}", htmlContent);
}
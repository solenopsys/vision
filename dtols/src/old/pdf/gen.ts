import puppeteer from "puppeteer";
import * as buffer from "buffer";

export async function genPdf(
	contentHtml: string,
	margin: { top: string; right: string; bottom: string; left: string },
	outFile: string,
) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(contentHtml);

	// images download processing
   

	const readableStream = await page.createPDFStream({
		format: "A4",
		margin,
	});

	const chunks: Buffer[] = [];
	const reader = readableStream.getReader();
	let done, value: buffer.Buffer;
	while (!done) {
		// @ts-ignore
		({ done, value } = await reader.read());
		if (!done) {
			console.log("Got a chunk of data:", value.length);
			chunks.push(value);
		}
	}
	await browser.close();

	const joinedBuffer = Buffer.concat(chunks);

	await Bun.write(outFile, joinedBuffer);
}

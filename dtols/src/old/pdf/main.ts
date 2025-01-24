
import {genPdf} from "./gen";
const html = await Bun.file("./templates/index.html").text();

console.log(html);

const margin={
    top:"2cm",
    right:"2cm",
    bottom:"2cm",
    left:"2cm"
}

await genPdf(html,margin, "./test.pdf")
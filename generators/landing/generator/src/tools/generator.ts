import { renderToString } from "@solenopsys/converged-renderer";
import { Body } from "../body";
import { writeFile } from "@fileio";

const fonts = ["Open Sans", "Montserrat", "Oswald"];

export async function renderPage(objectArray: any[], out: string) {
  const body = await renderToString(Body(objectArray));

  // Генерируем теги импорта для каждого шрифта из массива fonts
  const fontsLinks = fonts
    .map(font => {
      // Заменяем пробелы на "+" для формирования корректного URL
      const family = font.replace(/ /g, "+");
      // Для "Open Sans" можно задать веса, если это необходимо

      return `<link href="https://fonts.googleapis.com/css2?family=${family}&display=swap" rel="stylesheet">`;
    })
    .join("\n    ");

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">


    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fontsLinks}
    <link href="/generator.css" rel="stylesheet">
</head>
 
    ${body}
 
</html>
`;

  writeFile(out, html);
  console.log(`Страница сгенерирована: ${out}`);
}

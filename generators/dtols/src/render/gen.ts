import "./setup";
import fs from "fs";
import { renderToString } from "@solenopsys/converged-renderer";
import { Page } from "./page";
import { SideMenu } from "./side_menu";

 

 

export async function renderPage(prefix:string,lang:string,mdArray: any[], out: string, menuItems: MenuItem[] = []) {
  const pageMarkup = await renderToString(Page(mdArray));
  const menuMarkup =await renderToString(SideMenu(prefix+"/"+lang,menuItems)); 

  console.log("menuMarkup",menuMarkup);
  
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js"></script>
       <link href="${prefix}/style.css" rel="stylesheet">
  
</head>
<body>
    ${menuMarkup} 
    <div class="content">
        ${pageMarkup}
    </div>
</body>
</html>
`;

  fs.writeFileSync(out, html);
  console.log(`Страница сгенерирована: ${out}`);
}
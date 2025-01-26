import "./setup";
import fs from "fs";
import { renderToString } from "@solenopsys/converged-renderer";
import { Page } from "./page";

interface MenuItem {
  title: string;
  link: string;
}

const SideMenu = (items: MenuItem[]) => {
  return `
    <div class="side-menu">
      <nav>
        ${items.map(item => `
          <a href="${item.link}" class="menu-item">
            ${item.title}
          </a>
        `).join('')}
      </nav>
    </div>
  `;
};

export async function renderPage(mdArray: any[], out: string, menuItems: MenuItem[] = []) {
  const pageMarkup = await renderToString(Page(mdArray));
  const menuMarkup = SideMenu(menuItems); 
  
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
       <link href="/style.css" rel="stylesheet">
  
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
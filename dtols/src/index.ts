import { scanDir } from "./files";
import { loadMenu, loadRecursive, objectToPaths, getPathsFromMenu } from "./objects";
import { renderPage } from "./render/gen";
import { mkdirsSync } from "fs-extra";


const root = "../RU";
const out="../docs";

const menuItems = [
   { title: "Главная", link: "/" },
   { title: "О нас", link: "/about" },
   { title: "Контакты", link: "/contacts" }
 ];

async function genPages(root: string,outDir:string) {
   const obj = await loadMenu(root, "");
   console.log(JSON.stringify(obj, null, 4));

   const paths = getPathsFromMenu(obj);
   for (const path of paths) {
      console.log(path);
      const fullPath = root + path;
      
      const pathsTree = loadRecursive(fullPath);
    //  console.log(pathsTree);
      let pathsMD = objectToPaths(pathsTree);

      const files = []
      for (const pathMd in pathsMD) {

         if (pathsMD[pathMd].length > 0) {
            files.push(root+path + pathMd + "index.md");
         } else {
            let lp =
               files.push(root+path + pathMd + ".md");
         }

      }

     // console.log(files);
      const destPath=outDir+path;
       mkdirsSync(destPath);

      await renderPage(files,destPath+"/index.html",menuItems);
   }


}

await genPages(root,out);




// renderPage([
//    "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/applied.md",
//  "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/difference.md"
//  ], "page.html").catch(console.error);

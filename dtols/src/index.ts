import { scanDir } from "./files";
import { loadMenu, loadRecursive, objectToPaths, getPathsFromMenu } from "./objects";
import { renderPage } from "./render/gen";
import { mkdirsSync } from "fs-extra";
import { convertMenuStructure } from "./menu_converter";


const root = "../RU";
const out="../docs";

 
async function genPages(root: string,outDir:string) {
   const obj = await loadMenu(root, "");
   console.log(JSON.stringify(obj, null, 4));
 

   const groupedMenu = convertMenuStructure(obj);
   console.log(JSON.stringify(groupedMenu, null, 4));

   console.log("menu",groupedMenu);

   const paths = getPathsFromMenu(obj);
   for (const path of paths) {
      console.log(path);
      const fullPath = root + path;
      
      const pathsTree = loadRecursive(fullPath);
    
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

      await renderPage(files,destPath+"/index.html",groupedMenu);
   }


}

await genPages(root,out);




// renderPage([
//    "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/applied.md",
//  "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/difference.md"
//  ], "page.html").catch(console.error);

import { scanDir } from "./files";
import { loadMenu, loadRecursive, objectToPaths, getPathsFromMenu } from "./objects";
import { renderPage } from "./render/gen";
import { mkdirsSync } from "fs-extra";
import { convertMenuStructure } from "./menu_converter";

const prefix="/vision"
const lang="RU"
const root = "../";
const out="../docs/";

 
async function genPages(root: string,outDir:string) {
   const obj = await loadMenu(root+lang , "");
   console.log(JSON.stringify(obj, null, 4));
 

   const groupedMenu = convertMenuStructure(obj);
   console.log(JSON.stringify(groupedMenu, null, 4));

   console.log("menu",groupedMenu);

   const paths = getPathsFromMenu(obj);
   for (const path of paths) {
      console.log(path);
      const fullPath = root+lang + path;
      
      const pathsTree = loadRecursive(fullPath);
    
      let pathsMD = objectToPaths(pathsTree);



      const files = []
      for (const pathMd in pathsMD) {

         if (pathsMD[pathMd].length > 0) {
            files.push(root+ lang+path + pathMd + "index.md");
         } else {
            let lp =
               files.push(root+ lang+path + pathMd + ".md");
         }

      }

     // console.log(files);
      const destPath=outDir+lang+path;
       mkdirsSync(destPath);

      await renderPage(prefix+"/"+lang,files,destPath+"/index.html",groupedMenu);
   }


}

await genPages(root,out);




// renderPage([
//    "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/applied.md",
//  "/home/alexstorm/distrib/sources/vision/RU/technology/cap/src/difference.md"
//  ], "page.html").catch(console.error);

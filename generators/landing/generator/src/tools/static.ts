import "./setup";
import { renderPage } from "../../dest/generator";
import { parse } from "yaml"; 
import { readFile } from "@fileio";


function buildHtml(confFile:string,outFile:string) {

   const yamlContent = readFile(confFile);
   const config = parse(yamlContent);
   console.log("config",config) 
   
   renderPage(config.items, outFile);
}

buildHtml("../4ir-3d-landing.yamal","./dest/index.html");
buildHtml("../4ir-3d-wp.yamal","./dest/wp.html");
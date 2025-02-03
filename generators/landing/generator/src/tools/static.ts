import "./setup";
import { renderPage } from "../../dest/generator";
import { parse } from "yaml"; 
import { readFile } from "@fileio";
 
const yamlContent = readFile("../4ir-3d.yamal");
const config = parse(yamlContent);
console.log("config",config) 
 
renderPage(config.items, "./dest/index.html");
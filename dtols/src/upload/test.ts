 
 import {unified} from "unified";
import markdown from "remark-parse";
import remarkImages from 'remark-images'
console.log("REMARK", remarkImages);
import gmf from "remark-gfm";
import * as fs from "fs";


    const markdownContent = fs.readFileSync("test.md", 'utf-8');
    const tree:any = unified().use(remarkImages).use(gmf).use(markdown).parse(markdownContent) ;
    confirm(JSON.stringify(tree,null,2));
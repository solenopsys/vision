import { scanDir } from "./files";
import { loadRecursive, objectToPaths } from "./objects";


const dir = "/home/alexstorm/distrib/sources/vision/RU";
const obj = await loadRecursive(dir);

 console.log(obj);
// const pathsTree = objectToPaths(obj);
// console.log(pathsTree);

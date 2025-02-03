import fs from "fs";

export function readFile(path) {
  return  fs.readFileSync(path, "utf8");
}

export function writeFile(path, content) {
  fs.writeFileSync(path, content);
}
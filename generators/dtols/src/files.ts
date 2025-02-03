 

import yaml from "js-yaml"
import fs from "fs"

export function loadFile(name: string): any {
	return fs.readFileSync(name, "utf8"); // todo convert to bun function
}

export function loadYaml(name: string): any {

	try {
		const doc = yaml.load(loadFile(name));
		//console.log(doc);
		return doc;
	} catch (e) {
		console.log(e);
	}
}

export function  makePaths(base: string) {
  const keys = Object.keys(this.pathsTree).sort(sortByDepth);
  
  for (let key of keys) {
   const strings: string[] = key.split("/");
   let lastPath: string | undefined = strings.pop();
   if (lastPath === "") {
    lastPath = strings.pop();
   }
   if (lastPath === "") {
    lastPath = base;
   }
   if (lastPath === undefined) {
    throw new Error("No path");
   }
   this.paths[key] = {
    isDir: this.pathsTree[key].length > 0,
    name: lastPath,
   };
  }
}

export function sortByDepth(a: string, b: string): number {
    const depthA = a.split('/').length;
    const depthB = b.split('/').length;
    const lengthA = a.length;
    const lengthB = b.length;
  
    if (depthB - depthA !== 0) {
      return depthB - depthA;
    } else {
      return lengthB - lengthA || a.localeCompare(b);
    }
  }

export function scanDir(dir: string): string[] {
    let res: string[] = [];
    let files = fs.readdirSync(dir);
    files.forEach((file:string) => {
        let fullPath = dir + '/' + file;
        let stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            res = res.concat(scanDir(fullPath));
        } else {
            res.push(fullPath);
        }
    });
    return res;
}

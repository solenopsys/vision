import * as fs from "fs";
import { loadYaml } from "./files";
export function loadRecursive(dir: string): any {
	const file = dir + "/order.yaml";

	let includes: any;
	if (fs.existsSync(file)) {
		includes = loadYaml(file)["include"];
		if (!includes ) 
		   throw new Error("Order file wroing format 'include' not found:" + file);
	} else {
		throw new Error("File not found:" + file);
	}

	for (const key in includes) {
		const include = includes[key];
		if (typeof include === "string") {
			//  includes["index"]=key
			const subDir = dir + "/" + key;

			if (fs.existsSync(subDir)) {
				includes[key] = loadRecursive(subDir);
			}
		}
	}

	return includes ;
}

export function objectToPaths(
	obj: any,
	prefix: string = "",
): { [key: string]: string[] } {
	let paths: { [key: string]: string[] } = {};

	const keys: string[] = [];

	paths[prefix + "/"] = keys;

	for (let key in obj) {
		let value = obj[key];
		let newPrefix = prefix ? `${prefix}/${key}` : "/"+key;

		

		if (typeof value === "object" && value !== null) {
			paths = { ...paths, ...objectToPaths(value, newPrefix) };
            keys.push(newPrefix+"/");
		} else {
			paths[newPrefix] = [];
            keys.push(newPrefix);
		}
	}

	


	return paths;
}

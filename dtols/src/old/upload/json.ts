import { read } from "fs";


// from paramter
const name= "solenopsys";

const entry = `./content/landings/${name}/conf.json`;
import { imageUpload } from "../tools/upload";

const IPFS_HOST = "http://ipfs-api.solenopsys.org:80/api/v0";
import IpfsApi from "./ipfs";

const ipfs = new IpfsApi(IPFS_HOST);

async function readJson(entry: string): Promise<any> {
	const file = Bun.file(entry);
	const data = await file.json();
	return data;
}

function checkExtension(filePath: string, extensions: string[]): boolean {
	console.log("CHECK EXTENSION", filePath, extensions);
	for (let ext of extensions) {
		if (filePath.endsWith(ext)) {
			return true;
		}
	}
	return false;
}

async function injectRecursive(
	obj: any,
	exts: string[],
	fn: (value: any) => Promise<any>,
): Promise<any> {
	if (Array.isArray(obj)) {
		for (let item of obj) {
			await injectRecursive(item, exts, fn);
		}
	} else if (typeof obj === "object" && obj !== null) {
		for (let key in obj) {
			if (typeof obj[key] === "string") {
				const value = obj[key];
				if (checkExtension(value, exts)) {
					const res = await fn(value);
					console.log("RUN FUN", value, res);
					obj[key] = res;
				}
			} else {
				obj[key] = await injectRecursive(obj[key], exts, fn);
			}
		}
	}
	return obj;
}

function setCurrentDirByFile(filePath: string) {
	let dir = filePath.substring(0, filePath.lastIndexOf("/"));
	console.log("CURRENT DIR", dir);
	process.chdir(dir);
}

async function upload(filePath: string) {
	const data = await readJson(entry);
	setCurrentDirByFile(entry);

	const injectedJson = await injectRecursive(data, [".json"], (value: any) =>
		readJson(value),
	);

	const fn = async (value: any) => {
		return { "/": await imageUpload(ipfs, value) };
	};
	const injectedImages = await injectRecursive(
		injectedJson,
		[".png", ".jpg", ".jpeg", ".gif", ".svg"],
		fn,
	);


  //  console.log(JSON.stringify(injectedImages, null, 2));
    const cid= await ipfs.saveObject(injectedImages);

    console.log("JSON LINK",cid);
}

upload(entry);
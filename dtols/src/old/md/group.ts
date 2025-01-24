
import {loadRecursive,objectToPaths} from "../tools/objects";

async function genMd(dir: string, name: string) {
	const srcDir=dir+"/"+ name+"/src" 
	let yamlObject = loadRecursive(srcDir );
	let paths = objectToPaths(yamlObject);
	console.log("PATHS", paths);
	 let out = "";

	async function loadFile(dir: string) {
		let file = dir+".md" ;
		let data: string = await Bun.file(file).text();
		return "\n" + data + "\n";
	}

	for (const path in paths) {
		let lp=srcDir+ path
		if(paths[path].length>0){
			lp=lp+"index"
		}
		console.log("LOAD", lp);
		out += await loadFile(lp);
	}

	// console.log("OUT", name);
	const outDir = dir+"/"+name;
	const outFile=outDir +  "/readme.md";
	console.log("WRITE TO",outFile)
	await Bun.write(outFile, out);
}

const dir = "../../docs";

//await genMd(dir, "wp/club_landing"); 
await genMd(dir, "wp/club"); 
//await genMd(dir, "wp/robotization");
//await genMd(dir, "wp/solenopsys");
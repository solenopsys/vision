import { exportMdFileToIpfs } from "./ipfs";
import IpfsApi from "./ipfs";
import { loadRecursive } from "../tools/objects";
import { objectToPaths } from "../tools/objects";
import { sortByDepth } from "../tools/files";
import { copyFileSync } from "fs";
import { exit } from "process";

type Cid = {
	"/": string;
};

type MenuItem = {
	name: string;
	path: string;
	type: "menu";
	group?: Cid;
	children?: Cid[];
};

type ArticleInfo = {
	article: Cid;
	title: string;
	name: string;
};

type ArticlesGroup = {
	articles: ArticleInfo[];
	type: "group";
};

export class DirProcessor {
	//menuMap: { [key: string]: any } = {};
	menuKeys: { [key: string]: string } = {}; // path md to menu CID
	groupKeys: { [key: string]: string } = {}; // path md to menu CID
	pathsMap: { [key: string]: { cid: string; title: string } } = {}; // path md to article CID
	paths: { [key: string]: { isDir: boolean; name: string } } = {};
	pathsTree: { [key: string]: string[] } = {}; // pathes md array

	constructor(
		private dir: string,
		private ipfs: IpfsApi,
	) {}

	private async makePaths(base: string) {
		const keys = Object.keys(this.pathsTree).sort(sortByDepth);
	
	
		for (let key of keys) {
			const strings: string[] = key.split("/"); // todo remove this
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

		console.log("SORTED_PATHS", this.paths);
	}

	private makePathTree(base: string) {
		let yamlObject = loadRecursive(this.dir);
		console.log("YAML", yamlObject);
		
		this.pathsTree = objectToPaths(yamlObject);
		console.log("PATHS_TREE", this.pathsTree);
	

		this.makePaths(base);
	}

	async processMdFile(dir: string, path: string, index = false) {
		const filePath = dir + "/" + path + (index ? "/index.md" : ".md");
		const { cid, title } = await exportMdFileToIpfs(filePath, this.ipfs);
		console.log("VALUES", cid, " - ", title);
		this.pathsMap[path] = { cid, title };
		return cid;
	}

	private async publishMds() {
		for (let path of Object.keys(this.paths)) {
		
			const obj = this.paths[path];

			const isDir = obj.isDir;
			console.log("PATH",path, isDir);
			const cid = await this.processMdFile(this.dir, path, isDir);
			console.log("SAVED MD", cid, " - ", path);
		}
	}

	private async publishGroups() {
		for (let path of Object.keys(this.paths)) {
			const isDir = this.paths[path].isDir;

			const group: ArticlesGroup = {
				articles: [],
				type: "group",
			};

			if (isDir) {
				const subArticles =this.pathsTree[path].map<ArticleInfo>((subPath:string) => {
					const conf = this.paths[subPath];
					if (!conf.isDir)
						return {
							article: { "/": this.pathsMap[subPath].cid },
							title: this.pathsMap[subPath].title,
							name: conf.name,
						} as ArticleInfo;
				}).filter((item) => item !== undefined)

				const indexArticle={
					article: { "/": this.pathsMap[path].cid },
					title: this.pathsMap[path].title,
					name: this.paths[path].name,
				} as ArticleInfo;

				group.articles = [indexArticle,...subArticles];

				console.log("GROUP", group);

				const groupCid = await this.ipfs.saveObject(group);
				console.log("GROUP CID", path, " - ", groupCid);

				this.groupKeys[path] = groupCid;
			} else {
				console.log("NOT DIR", path);
			}
		}
	}

	private async publishMenu() {
		for (let path of Object.keys(this.paths)) {
			console.log("PATH", path);

			const obj = this.pathsMap[path];

			const conf = this.paths[path];
			if (obj) {
				const menuItem: MenuItem = {
					name: obj.title,
					path: conf.name,
					type: "menu",
					group: undefined,
				};

				if (this.pathsTree[path].length > 0) {
					let concat = false;
					const children = this.pathsTree[path]
						.map<Cid>((path) => {
							concat = this.pathsTree[path].length === 0;
							return { "/": this.menuKeys[path] };
						})
						.filter((item) => item["/"] !== undefined);

					console.log("CHILDREN", children);

					menuItem.group = { "/": this.groupKeys[path] };
					menuItem.children = children;
					const menuCid = await this.ipfs.saveObject(menuItem);
					console.log("MENU CID", path, " - ", menuCid);
					this.menuKeys[path] = menuCid;
				}
			} else {
				console.log("OBJECT NOT FOUND", path);
			}
		}
	}

	public async process(base: string) {
		this.makePathTree(base);
		await this.publishMds();
		await this.publishGroups();
		await this.publishMds();
		await this.publishGroups();
		await this.publishMenu();
	}
}

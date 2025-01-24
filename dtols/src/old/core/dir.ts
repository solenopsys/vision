// storage.interface.ts
export interface IStorage {
	processMdFile(filePath: string): Promise<{ cid: string; title: string }>;
	saveObject(object: any): Promise<string>;
 }
 
 // ipfs.storage.ts
 export class IpfsStorage implements IStorage {
	constructor(private ipfs: IpfsApi) {}
 
	async processMdFile(filePath: string): Promise<{ cid: string; title: string }> {
	  return await exportMdFileToIpfs(filePath, this.ipfs);
	}
 
	async saveObject(object: any): Promise<string> {
	  return await this.ipfs.saveObject(object);
	}
 }
 
 // dir-processor.ts
 export class DirProcessor {
	menuKeys: { [key: string]: string } = {};
	groupKeys: { [key: string]: string } = {};
	pathsMap: { [key: string]: { cid: string; title: string } } = {};
	paths: { [key: string]: { isDir: boolean; name: string } } = {};
	pathsTree: { [key: string]: string[] } = {};
 
	constructor(
	  private dir: string,
	  private storage: IStorage
	) {}
 
	private async makePaths(base: string) {
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
 
	private makePathTree(base: string) {
	  let yamlObject = loadRecursive(this.dir);
	  this.pathsTree = objectToPaths(yamlObject);
	  this.makePaths(base);
	}
 
	private async processMdFile(path: string, index = false) {
	  const filePath = this.dir + "/" + path + (index ? "/index.md" : ".md");
	  const { cid, title } = await this.storage.processMdFile(filePath);
	  this.pathsMap[path] = { cid, title };
	  return cid;
	}
 
	private async publishMds() {
	  for (let path of Object.keys(this.paths)) {
		 const isDir = this.paths[path].isDir;
		 const cid = await this.processMdFile(path, isDir);
		 console.log("SAVED MD", cid, " - ", path);
	  }
	}
 
	private async publishGroups() {
	  for (let path of Object.keys(this.paths)) {
		 const isDir = this.paths[path].isDir;
 
		 if (isDir) {
			const group: ArticlesGroup = {
			  articles: [],
			  type: "group",
			};
 
			const subArticles = this.pathsTree[path]
			  .map<ArticleInfo>((subPath: string) => {
				 const conf = this.paths[subPath];
				 if (!conf.isDir)
					return {
					  article: { "/": this.pathsMap[subPath].cid },
					  title: this.pathsMap[subPath].title,
					  name: conf.name,
					} as ArticleInfo;
			  })
			  .filter((item) => item !== undefined);
 
			const indexArticle = {
			  article: { "/": this.pathsMap[path].cid },
			  title: this.pathsMap[path].title,
			  name: this.paths[path].name,
			} as ArticleInfo;
 
			group.articles = [indexArticle, ...subArticles];
			const groupCid = await this.storage.saveObject(group);
			this.groupKeys[path] = groupCid;
		 }
	  }
	}
 
	private async publishMenu() {
	  for (let path of Object.keys(this.paths)) {
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
			  const children = this.pathsTree[path]
				 .map<Cid>((path) => {
					return { "/": this.menuKeys[path] };
				 })
				 .filter((item) => item["/"] !== undefined);
 
			  menuItem.group = { "/": this.groupKeys[path] };
			  menuItem.children = children;
			  const menuCid = await this.storage.saveObject(menuItem);
			  this.menuKeys[path] = menuCid;
			}
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
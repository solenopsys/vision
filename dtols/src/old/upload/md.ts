import IpfsApi from "./ipfs";
import { LiteNode, TreeLink } from "../tools/types";
import { imageUpload } from "../tools/upload";

export class MdProcessor {
	constructor(private ipfs: IpfsApi) {}

	async textToLink(tree: LiteNode): Promise<LiteNode> {
		// @ts-ignore
		const data: Blob = new Blob([tree.value as string], {
			type: "application/json",
		});
		const cid = await this.ipfs.saveBytes(data);
		return {
			type: tree.type,
			value: {
				"/": cid,
			},
		};
	}
	async imageConvert(tree: any): Promise<LiteNode> {
		const cid: string = await imageUpload(this.ipfs, tree.url);

		console.log("IMAGE", cid);

		return {
			type: tree.type,
			alt: tree.alt,
			cid: cid,
		};
	}

	async dagToLink(tree: LiteNode): Promise<TreeLink> {
		return { "/": await this.ipfs.saveObject(tree) };
	}

	async recursiveProcessing(
		root: LiteNode,
		level: number,
	): Promise<LiteNode | TreeLink> {
		let resChildren: (LiteNode | TreeLink)[] = [];
		if (root.children) {
			let items = root.children?.map((child) =>
				this.recursiveProcessing(child as LiteNode, level + 1),
			);

			resChildren = await Promise.all(items);
		}

		const resNode: LiteNode = {
			type: root.type,
			value: root.value,
			children: resChildren,
		};

		if (Object.keys(root.params).length > 0) {
			resNode.params = root.params;
		}

		if (root.type === "text") {
			return await this.textToLink(root as LiteNode);
		}

		if (root.type === "image") {
			return await this.imageConvert(root);
		}

		if (level === 1) {
			return await this.dagToLink(resNode);
		}
		return resNode;
	}

	async rootProcessing(root: LiteNode): Promise<string> {
		const dag = await this.recursiveProcessing(root, 0);
		// console.log("DAG", dag)
		return await this.ipfs.saveObject(dag);
	}
}

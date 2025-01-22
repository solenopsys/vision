import { TreeNode, LiteNode } from "./types";

export function treeCleaning(root: TreeNode): LiteNode {
	let children = root.children?.map((child) => treeCleaning(child));
	return {
		type: root.type,
		value: root.value,
		url: root.url,
		alt: root.alt,

		children: children,
		params: { depth: root.depth },
	};
}

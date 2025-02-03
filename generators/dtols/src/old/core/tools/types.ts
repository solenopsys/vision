

export type Image = {
	url: string;
	alt: string;
}

export type TreeNode = { // todo need refactor
	children?: TreeNode[];
	type: string;
	value?: string;
	depth: 1;
	url?: string;
	alt?: string;
} 

export type LiteNode = {
	children?: (LiteNode | TreeLink| Image)[];
	type: string;
	value?: string | TreeLink;
	params?: any;
	src?: TreeLink;
	alt?: string;
};

export type TreeLink = {
	"/": string;
};

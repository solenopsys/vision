import IpfsApi from "../upload/ipfs";

export async function imageUpload(ipfs: IpfsApi, src: string): Promise<string> {
	const buf = await Bun.file(src).arrayBuffer();
	const ext = src.split(".").pop();
	// @ts-ignore
	const data: Blob = new Blob([buf], { type: "image/" + ext });
	const cid = await ipfs.saveBytes(data);

	return cid;
}

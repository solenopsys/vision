import axios, {AxiosResponse} from 'axios';
import { TreeNode } from "../tools/types";

interface CID {
    '/': string;
}

interface DagPutResponse {
    Cid: CID;
}

interface AddResponse {
    Hash: string;
}

class IpfsApi {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }


    async saveObject(obj: Object): Promise<string> {
        const formData = new FormData();


        let s = JSON.stringify(obj);
        // @ts-ignore
        const data: Blob = new Blob([s], {type: 'application/json'});


        formData.append('file', data, 'file');

        const params = {
            'store-codec': 'dag-cbor',
            'input-codec': 'dag-json',
            'hash': 'sha2-256',
            'allow-big-block': 'false'
        };

        const putUrl = `${this.url}/dag/put`;

        try {
            const response: AxiosResponse = await axios.post(putUrl, formData, {
                params: params
            });
            return response.data.Cid['/'];
        } catch (error) {
            throw error;
        }
    }

    async saveBytes(data: Blob): Promise<string> {

        const formData = new FormData();
       

        const putUrl = `${this.url}/add`;

        formData.append('file', data, 'file');

        try {
            const response: AxiosResponse = await axios.post(putUrl, formData, {});
            let hash = response.data.Hash;

            return hash;
        } catch (error) {
            throw error;
        }
    }


}

export default IpfsApi;



import {unified} from "unified";
import markdown from "remark-parse";
import remarkImages from 'remark-images';
console.log("REMARK", remarkImages);
import gmf from "remark-gfm";
import * as fs from "fs";
import { treeCleaning } from "../tools/utils";
import { MdProcessor } from './md';

export async function exportMdFileToIpfs(mdFile: string,ipfs:IpfsApi):Promise<{cid:string,title:string}> {
    const markdownContent = fs.readFileSync(mdFile, 'utf-8');
    const tree:any = unified().use(markdown).use(remarkImages).use(gmf).parse(markdownContent) as TreeNode;
    let firstItem = tree.children[0];


    if(firstItem==null){
        console.error("CORRUPTED MD",mdFile)
    }

    firstItem.type = "heading";
    let title= firstItem.children[0].value ;


    const cleaned = treeCleaning(tree);
   // console.log("PRINT CLEANED", cleaned.children);
    const processor = new MdProcessor(ipfs);
    let cid = await processor.rootProcessing(cleaned);
    return {cid,title}
}
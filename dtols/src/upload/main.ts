import {DirProcessor} from "./dir";
import IpfsApi from "./ipfs";
import {MdProcessor} from "./md";
import {exportMdFileToIpfs} from "./ipfs";


const IPFS_HOST = 'http://ipfs-api.solenopsys.org:80/api/v0';


const ipfs = new IpfsApi(IPFS_HOST);

const name = "ecosystem"

const dp=new DirProcessor("./content/topics/EN/"+name,ipfs);

dp.process(name)

//  let res = exportMdFileToIpfs("C:\\dev\\sources\\MAIN\\whiteparer\\content\\topics\\solenopsys\\technologies\\02.Detonation.md",ipfs);

// res.then(
//     (r)=>{
//         console.log(r)
//     }
// )
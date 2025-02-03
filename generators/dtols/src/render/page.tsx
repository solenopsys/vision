 
import { Markdown } from "./markdown.tsx";
import { For } from "@solenopsys/converged-renderer";

export function Page(mds:string[]) {
  //console.log("PAGE", mds);
   return  ()=>{return  (
     <div class="page">
         

      
       <For values={mds}>
      
      {( value ) => {
         
       return  <Markdown url={value} ></Markdown>
      }}
    </For>
     </div>
   );}
 }
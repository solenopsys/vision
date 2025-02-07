import "./banner.css"

import { parse } from "yaml";
import { readFile } from "@fileio";
import { Button } from "../button/button.tsx"


export const Banner = ({ url }: { url: string }) => {
  const yamlContent = readFile(url);

  const config = parse(yamlContent);
  console.log("banner",config)

   return (
     <div class="banner-container">
       <img 
         src={config.image} 
         alt="banner" 
         class="banner-image"
       />
       <div class="banner-text-block">
       <div class="banner-title">{config.title}</div> 
       <div  class="banner-subtitle">{config.subtitle} </div> 
       <div style={{marginTop:"10px"}}>
       <Button title="Присоединиться" onClick={() => {
          console.log("planData" )
        }} />
       </div>
     
       </div>
       
     </div>
   );
 };
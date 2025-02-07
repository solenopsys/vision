import { Markdown } from "../markdown.tsx";
import {Feature} from "./feature.tsx"
import { For } from "@solenopsys/converged-renderer";

import { parse } from "yaml";
import { readFile } from "@fileio";

  
 

export const Features = ({ url }: { url: string }) => {
   const yamlContent = readFile(url);
 
   const config = parse(yamlContent);

   console.log("features",config)
 
    return (
      <div class="features">
<For values={config}>
      {(feature: any) => (
         <div>
 <Feature icon={feature.icon} title={feature.title} description={feature.description} /> 
         </div>
       
      )}
    </For>
      </div>
      
    );
  };
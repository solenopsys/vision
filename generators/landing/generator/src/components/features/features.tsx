import { Markdown } from "../markdown.tsx";
import { Feature } from "./feature.tsx"
import { For } from "@solenopsys/converged-renderer";

import { parse } from "yaml";
import { readFile } from "@fileio";
import "./features.css"



export const Features = ({ url }: { url: string }) => {
  const yamlContent = readFile(url);

  const config = parse(yamlContent);

  console.log("features", config)
 

  return (
    <div class="width_conteiner features">
      <h1>{config.header}
      </h1>
      <For values={config.items}>
        {(feature: any) => (
          <div>
            <Feature icon={feature.icon} title={feature.title} description={feature.description} labels={feature.labels} />
          </div>

        )}
      </For>
    </div>

  );
};
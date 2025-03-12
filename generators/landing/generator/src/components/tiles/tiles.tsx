import { Markdown } from "../markdown.tsx";
import { Tile } from "./tile.tsx"
import { For } from "@solenopsys/converged-renderer";

import { parse } from "yaml";
import { readFile } from "@fileio";
import "./tiles.css"



export const Tiles = ({ url }: { url: string }) => {
  const yamlContent = readFile(url);

  const config = parse(yamlContent);

  console.log("tiles", config)

  return (
    <div class="width_conteiner tiles">
      <For values={config}>
        {(feature: any) => (
          <div>
            <Tile persent={feature.persent} description={feature.description} />
          </div>

        )}
      </For>
    </div>

  );
};
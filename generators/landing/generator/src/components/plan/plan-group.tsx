import { Markdown } from "../markdown.tsx";
import { Plan } from "./plan.tsx"
import { For } from "@solenopsys/converged-renderer";

import { parse } from "yaml";
import { readFile } from "@fileio";


import "./plan-group.css"



export function PlanGroup({ url }: { url: string }) {
  return () => {
    console.log("planDir", url)
    // Синхронно читаем файл как текст (Node.js-способ)
    const yamlContent = readFile(url + "/index.yaml");

    const config = parse(yamlContent);


    return (
      <div class="width_conteiner" >
        <Markdown url={url + "/" + config.header} />

        <div class="plan-group">


          <For values={config.items}>
            {(item: Item) => {
              if (item.plan) {
                return <Plan url={url + "/" + item.plan} />
              }

              return null;
            }}
          </For>
        </div>
        <Markdown url={url + "/" + config.footer} />
      </div>
    );
  }
}
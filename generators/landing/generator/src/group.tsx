import { Markdown } from "./components/markdown.tsx";
import { Banner } from "./components/banner/banner.tsx";
import {PlanGroup} from "./components/plan/plan-group.tsx"
import {Tiles} from "./components/tiles/tiles.tsx"
import {Features} from "./components/features/features.tsx"
import { For } from "@solenopsys/converged-renderer";
import { Feature } from "./components/features/feature.tsx";


interface Item {
  banner?: string;
  md?: string;
}

 
 

export function Group(items: Item[]) {
  return () => {
    return (
      <div class="page">
        <For values={items}>
          {(item: Item) => {
            if (item.plan) {
              return <div style="margin-left:40px;margin-right:40px"><PlanGroup url={item.plan} /></div>
            }
            if (item.tiles) {
              return <div style="margin-left:40px;margin-right:40px"><Tiles url={item.tiles} /></div>
            }
            if (item.features) {
              return <div style="margin-left:40px;margin-right:40px"><Features url={item.features} /></div>
            }
            if (item.md) {
              return <div style="margin-left:40px;margin-right:40px"><Markdown url={item.md} /></div>
            }
            if (item.banner) {
              return <Banner url={item.banner} />
            }
            return null
          }}
        </For>
      </div>
    );
  }
}
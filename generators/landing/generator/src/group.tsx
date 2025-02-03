import { Markdown } from "./components/markdown.tsx";
import { Banner } from "./components/banner/banner.tsx";
import {PlanGroup} from "./components/plan/plan-group.tsx"
import { For } from "@solenopsys/converged-renderer";


interface Item {
  banner?: string;
  md?: string;
}

 
 

export function Group(items: Item[]) {
  return () => {
    return (
      <div className="page">
        <For values={items}>
          {(item: Item) => {
            if (item.plan) {
              return <div style="margin-left:40px;margin-right:40px"><PlanGroup url={item.plan} /></div>
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
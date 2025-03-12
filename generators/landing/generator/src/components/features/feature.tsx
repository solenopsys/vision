import { For } from "@solenopsys/converged-renderer";
import { IconLabel } from "../iconlabel/iconlabel";
import "./feature.css"

export function Feature({ icon, title, description, labels }: { icon: string, title: string, description: string, labels: any[] }) {

   console.log("labels11", labels)
   return (
      <div class="feature">
         <div style="display:flex;gap:10px">


            <div>
               <img src={icon} alt={title} style={{ height: '48px', width: 'auto', paddingTop: "12px" }} />
            </div>
            <div style={{paddingLeft:"23px"}}>
               <div class="feature-title">{title}</div>
               <div class="feature-description">{description}</div>
            </div>
         </div>

         <div class="labels-container">


            <For values={labels}>
               {(label: any) => (


                  <IconLabel icon={label.icon} label={label.title} />


               )}

            </For>
         </div>
      </div>
   );
}



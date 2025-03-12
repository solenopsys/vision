import "./iconlabel.css"

export function IconLabel({ icon, label }: { icon: string, label: string }) {
   return (
      <div class="iconlabel">
         <div class="iconlabel-icon">
            <img src={icon} alt={label} style={{ height: '32px', width: 'auto',paddingTop:"12px" }}  />
         </div>
         <div class="iconlabel-label">{label}</div>
      </div>
   );
}
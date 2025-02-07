export function Feature({ icon, title, description }: {icon:string, title: string, description: string }) {
   return (
      <div class="feature">
         <div class="feature-title">{title}%</div>
         <div class="feature-description">{description}</div>
      </div>
   );
}


 
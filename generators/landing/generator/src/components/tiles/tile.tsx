import "./tile.css"

export function Tile({ persent, description }: { persent: number, description: string }) {
   return (
      <div class="tile">
         <div class="tile-persent">{persent}%</div>
         <div class="tile-description">{description}</div>
      </div>
   );
}
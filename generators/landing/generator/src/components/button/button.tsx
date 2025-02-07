import { For } from "@solenopsys/converged-renderer";
  

 
import "./button.css"

export function Button({ onClick, title }: { onClick: () => void; title: string }) {
  return (
    <button class="button" onClick={onClick}>
      {title}
    </button>
  );
}
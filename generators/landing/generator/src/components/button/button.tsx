import { For } from "@solenopsys/converged-renderer";
  

 
import "./button.css"

export function Button({ onClick, title,icon }: { onClick: () => void; title: string,icon:string }) {
  return (
    <button class="button" onClick={onClick}>
      {title} 
      <img src={icon}   style={{ height: '24px', width: 'auto', position:"absolute", top: "10px", right: "10px", filter: "brightness(0) invert(1)"  }} />  
    </button>
  );
}


export function JoinButton( ) {
  return (
    <Button title="Присоединиться" icon="/images/arrow-thick-circle-right-1.svg" onClick={() => {
      console.log("JOIN")
    }} />
  );
}


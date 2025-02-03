import { Group } from "./group";
import { Header } from "./components/header/header.tsx";
import { Footer } from "./components/footer/footer.tsx";
import "./style.css"

export function Body(objectArray: any[]) {

   return <body>
      <Header />
      <div class="content">
         {()=>Group(objectArray)}
      </div>
      <Footer />
   </body>
}
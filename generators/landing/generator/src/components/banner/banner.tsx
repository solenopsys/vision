import "./banner.css"

export const Banner = ({ url }: { url: string }) => {
   return (
     <div class="banner-container">
       <img 
         src={url} 
         alt="banner" 
         class="banner-image"
       />
     </div>
   );
 };
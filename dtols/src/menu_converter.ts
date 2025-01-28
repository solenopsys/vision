// Типы для исходной структуры
interface BaseMenuItem {
   type: string;
   title: string;
 }
 
 interface ContentItem {
   type: "content";
   path: string;
 }
 
 interface NestedMenuItem extends BaseMenuItem {
   type: "item";
   sub: ContentItem | Record<string, NestedMenuItem>;
 }
 
 type MenuStructure = Record<string, NestedMenuItem>;
 
 // Типы для целевой структуры
 interface SubMenuItem {
   title: string;
   link: string;
 }
 
 interface GroupMenuItem {
   title: string;
   items: SubMenuItem[];
 }
 
 export function convertMenuStructure(structure: MenuStructure): GroupMenuItem[] {
   const result: GroupMenuItem[] = [];
 
   // Обрабатываем каждую группу (первый уровень)
   Object.values(structure).forEach(groupItem => {
     const group: GroupMenuItem = {
       title: groupItem.title,
       items: []
     };
 
     // Если у группы есть подпункты
     if (groupItem.sub && typeof groupItem.sub === 'object' && !('path' in groupItem.sub)) {
       // Обрабатываем каждый подпункт
       Object.values(groupItem.sub).forEach(subItem => {
         if (subItem.type === 'item' && subItem.sub && 'path' in subItem.sub) {
           group.items.push({
             title: subItem.title,
             link: subItem.sub.path
           });
         }
       });
     }
 
     if (group.items.length > 0) {
       result.push(group);
     }
   });
 
   return result;
 }
 
 
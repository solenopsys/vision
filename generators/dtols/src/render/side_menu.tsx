
import {  type Component } from "@solenopsys/converged-renderer";

export interface SubMenuItem {
  title: string;
  link: string;
}

export interface GroupMenuItem {
  title: string;
  items: SubMenuItem[];
}

export interface SideMenuProps {
  items: GroupMenuItem[];
}

export const SideMenu: Component<SideMenuProps> = (prefix:string, items:GroupMenuItem[] ) => {
  return (
    <div class="side-menu">
      <nav class="flex flex-col space-y-4">
        {() => items.map(group => (
          <div class="menu-group">
            <h3 class="text-lg font-semibold mb-2">{group.title}</h3>
            <div class="flex flex-col space-y-2 pl-4">
              {group.items.map(item => (
                <div><a 
                  href={prefix+item.link}
                  class="menu-item text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.title}
                </a></div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
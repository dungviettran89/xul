import { singleton, singletons } from "@xul/core";
import { action, noopState, reduce, state } from "@xul/redux";

export interface ITabConfig {
  id: string;
  name: string;
  type: string;
  icon?: any;
  default?: boolean;
}
@singleton()
@noopState(`session.tab`)
export class TabController {
  public registry: Map<string, any> = new Map();

  @state("selectedTab")
  private selectedTab: string;
  @state("tabs", [])
  private tabs: ITabConfig[];

  public getTab(id?: string): ITabConfig | undefined {
    id = id || this.selectedTab;
    return this.getTabs().find(t => t.id === id);
  }

  public getIndex(id?: string): number {
    id = id || this.selectedTab;
    const tabs = this.getTabs();
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === id) {
        return i;
      }
    }
    return 0;
  }
  public getDefaultTabs(): ITabConfig[] {
    return [
      { id: "home", name: "Home", type: "home", icon: "home" },
      { id: "agent", name: "Agent", type: "NodeTab", icon: "computer" },
      { id: "scenario", name: "Scenario", type: "scenario", icon: "book" },
      { id: "report", name: "Report", type: "report", icon: "assignment_turned_in" }
    ].map(t => ({ ...t, default: true }));
  }
  public getTabs(): ITabConfig[] {
    return [...this.getDefaultTabs(), ...this.tabs];
  }

  @action()
  public selectTab(value: number) {
    const { id } = this.getTabs()[value];
    return { selectedTab: id };
  }

  @reduce()
  public onSelectTab(s: any, { selectedTab }: { selectedTab: string }) {
    return { ...s, selectedTab };
  }
}
export const applicationTab = (name?: string) => {
  return (clazz: any) => {
    singletons.get(TabController).registry.set(name || clazz.name, clazz);
    return clazz;
  };
};

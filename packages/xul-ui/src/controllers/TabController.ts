import { singleton, singletons } from "@xul/core";
import { action, reactState, reduce, state } from "@xul/redux";

export interface ITabConfig {
  id: string;
  name: string;
  type: string;
  icon?: any;
}

@singleton()
@reactState(`session.tab`)
export class TabController {
  @state("selectedTab")
  private selectedTab: string;
  @state("tabs", [])
  private tabs: ITabConfig[];

  public getSelectedTab(id?: string): number {
    id = id || this.selectedTab;
    const tabs = this.getTabs();
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === id) {
        return i;
      }
    }
    return 0;
  }

  public getTabs(): ITabConfig[] {
    const home = { id: "home", name: "Home", type: "home", icon: "home" };
    const agent = { id: "agent", name: "Agent", type: "agent", icon: "airplay" };
    return [home, agent, ...this.tabs];
  }

  @action()
  public selectTab(value: number) {
    const { id } = this.getTabs()[value];
    return { selectedTab: id };
  }

  @reduce()
  public onSelectTab(s: any, { selectedTab }: { selectedTab: string }) {
    const session = s.session || {};
    const tab = session.tab || {};
    return { ...s, session: { ...session, tab: { ...tab, selectedTab } } };
  }
}
export const tabController: TabController = singletons.get(TabController);

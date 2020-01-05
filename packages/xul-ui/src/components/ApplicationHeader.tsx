import { AppBar, Divider, Icon, IconButton, Tab, Tabs } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { autowired } from "@xul/core";
import { reactState } from "@xul/redux";
import React, { CSSProperties } from "react";
import { DrawerController } from "../controllers/DrawerController";
import { ITabConfig, TabController } from "../controllers/TabController";
@reactState()
export class ApplicationHeader extends React.Component {
  @autowired()
  public drawerController: DrawerController;
  @autowired()
  public tabController: TabController;

  public render() {
    const tabs: ITabConfig[] = this.tabController.getTabs();
    const selectTab = (e: any, value: number) => this.tabController.selectTab(value);
    const selectedTab = this.tabController.getIndex();
    const openDrawer = (e: any) => this.drawerController.openDrawer();
    return (
      <AppBar position="fixed" style={appBar}>
        <IconButton color="inherit" aria-label="menu" style={compactButton} onClick={openDrawer}>
          <MenuIcon />
        </IconButton>
        <Divider orientation="vertical" />
        <Tabs aria-label="App Header" variant="scrollable" style={tabStyle} value={selectedTab} onChange={selectTab}>
          {tabs.map(t => (
            <Tab key={t.id} title={t.name} label={t.icon ? undefined : t.name} icon={<Icon>{t.icon}</Icon>} aria-controls={t.id} style={compact} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export const compactButton: CSSProperties = {
  padding: "8px"
};
const compact: CSSProperties = {
  minHeight: "auto",
  minWidth: `auto`
};
const appBar: CSSProperties = {
  ...compact,
  display: `flex`,
  flexDirection: `row`
};
const tabStyle: CSSProperties = {
  ...compact,
  flexGrow: 1
};

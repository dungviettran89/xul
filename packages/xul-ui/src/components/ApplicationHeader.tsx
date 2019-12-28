import { AppBar, Divider, Icon, IconButton, Tab, Tabs } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { reactState } from "@xul/redux";
import React, { CSSProperties } from "react";
import { drawerController } from "../controllers/DrawerController";
import { ITabConfig, tabController } from "../controllers/TabController";
@reactState()
export class ApplicationHeader extends React.Component {
  public render() {
    const tabs: ITabConfig[] = tabController.getTabs();
    const selectTab = (e: any, value: number) => tabController.selectTab(value);
    const selectedTab = tabController.getSelectedTab();
    const openDrawer = (e: any) => drawerController.openDrawer();
    return (
      <AppBar position="static" style={appBar}>
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

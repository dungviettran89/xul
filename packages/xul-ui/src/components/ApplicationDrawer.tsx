import { AppBar, Drawer, Icon, IconButton } from "@material-ui/core";
import { autowired } from "@xul/core";
import { reactState } from "@xul/redux";
import React, { CSSProperties } from "react";
import { DrawerController } from "../controllers/DrawerController";
import { compactButton } from "./ApplicationHeader";
@reactState()
export class ApplicationDrawer extends React.Component {
  @autowired()
  public drawerController: DrawerController;

  public render() {
    const closeDrawer = (e: any) => this.drawerController.closeDrawer();
    const appBar: CSSProperties = { width: "400px", display: "flex", flexDirection: "row" };
    const open = this.drawerController.open;
    return (
      <Drawer open={open} onClose={closeDrawer}>
        <AppBar position="static" style={appBar}>
          <IconButton color="inherit" aria-label="menu" style={compactButton} onClick={closeDrawer}>
            <Icon>arrow_back</Icon>
          </IconButton>
        </AppBar>
      </Drawer>
    );
  }
}

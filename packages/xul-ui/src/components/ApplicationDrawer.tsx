import { AppBar, Drawer, Icon, IconButton } from "@material-ui/core";
import { reactState } from "@xul/redux";
import React, { CSSProperties } from "react";
import { drawerController } from "../controllers/DrawerController";
import { compactButton } from "./ApplicationHeader";
@reactState()
export class ApplicationDrawer extends React.Component {
  public render() {
    const closeDrawer = (e: any) => drawerController.closeDrawer();
    const appBar: CSSProperties = { width: "400px", display: "flex", flexDirection: "row" };
    return (
      <Drawer open={drawerController.open} onClose={closeDrawer}>
        <AppBar position="static" style={appBar}>
          <IconButton color="inherit" aria-label="menu" style={compactButton} onClick={closeDrawer}>
            <Icon>arrow_back</Icon>
          </IconButton>
        </AppBar>
      </Drawer>
    );
  }
}

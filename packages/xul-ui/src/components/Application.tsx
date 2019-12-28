import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { enableHashStateStore } from "@xul/redux/lib/store/HashStateStore";
import { enableSessionStateStore } from "@xul/redux/lib/store/SessionStateStore";
import React, { Component } from "react";
import { ApplicationDrawer } from "./ApplicationDrawer";
import { ApplicationHeader } from "./ApplicationHeader";
@enableHashStateStore()
@enableSessionStateStore()
export class Application extends Component {
  public render() {
    const theme = createMuiTheme();
    return (
      <ThemeProvider theme={theme}>
        <div>
          <ApplicationHeader />
          <ApplicationDrawer />
        </div>
      </ThemeProvider>
    );
  }
}

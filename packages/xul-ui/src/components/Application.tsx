import { Box, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { enableHashStateStore } from "@xul/redux/lib/store/HashStateStore";
import { enableSessionStateStore } from "@xul/redux/lib/store/SessionStateStore";
import React, { Component } from "react";
import { ApplicationHeader } from "./ApplicationHeader";
@enableHashStateStore()
@enableSessionStateStore()
export class Application extends Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <ApplicationHeader />
        </Box>
      </ThemeProvider>
    );
  }
}
export const theme = createMuiTheme();

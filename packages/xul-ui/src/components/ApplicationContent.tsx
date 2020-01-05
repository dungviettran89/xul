import { autowired } from "@xul/core";
import { reactState } from "@xul/redux";
import React from "react";
import { TabController } from "../controllers/TabController";
@reactState()
export class ApplicationContent extends React.Component<any, any> {
  @autowired()
  public tabController: TabController;

  public render() {
    const tab = this.tabController.getTab();
    if (tab && tab.type && this.tabController.registry.get(tab.type)) {
      return React.createElement(this.tabController.registry.get(tab.type));
    }
    return (
      <div>
        <h1>No content</h1>
      </div>
    );
  }
}

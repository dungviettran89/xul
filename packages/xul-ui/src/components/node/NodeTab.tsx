import React from "react";
import { applicationTab } from "../../controllers/TabController";
@applicationTab()
export class NodeTab extends React.Component {
  public render() {
    return <h1>NodeTab</h1>;
  }
}

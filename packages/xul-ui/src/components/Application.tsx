import { reactState, state } from "@xul/redux";
import { enableHashStateStore } from "@xul/redux/lib/store/HashStateStore";
import React, { Component } from "react";
import { nodeService } from "../service/NodeService";

@enableHashStateStore()
@reactState(`hash`)
export class Application extends Component {
  @state(`clicked`, 0)
  public clicked: number;
  public render() {
    return (
      <div>
        <h1>Hello world</h1>
        <h3>{this.clicked}</h3>
        <button onClick={e => nodeService.click(this.clicked)}>Click me</button>
      </div>
    );
  }
}

#!/usr/bin/env node
import { postConstruct } from "@xul/core";
import { xulApplication } from "@xul/express";
import { AutomationNode } from "./server/model/AutomationNode";

@xulApplication()
export class XulApplicationServer {
  @postConstruct()
  public async start() {
    await AutomationNode.sync({ alter: true });
  }
}

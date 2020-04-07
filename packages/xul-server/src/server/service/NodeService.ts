import { autowired, postConstruct, scheduled, singleton } from "@xul/core";
import md5 from "md5";
import os from "os";
import { AutomationNode } from "../model/AutomationNode";

@singleton()
export class NodeService {
  public current: AutomationNode;
  public active: AutomationNode[] = [];
  @autowired(`xul.express.port`)
  public applicationPort: number;

  @postConstruct()
  public async initialize(): Promise<any> {
    const networkInterfaces = os.networkInterfaces();
    const address: string = Object.keys(networkInterfaces)
      .map(i => networkInterfaces[i])
      .reduce((a, b) => a.concat(b), [])
      .filter(ni => ni.family === "IPv4")
      .map(ni => ni.address)
      .filter(a => a !== "127.0.0.1" && a !== "::1")
      .pop();
    const port: number = this.applicationPort;
    const url: string = `http://${address}:${port}`;
    const id: string = md5(url);
    const friendlyName: string = os.hostname();
    const updated: number = Date.now();
    this.current = await AutomationNode.findOne({ where: { id } });
    if (!this.current) {
      this.current = await AutomationNode.create({ id, friendlyName, address, updated, port, url, status: "initializing" });
    } else {
      Object.assign(this.current, { id, friendlyName, address, updated, port, url, status: "initializing" });
      this.current.save();
    }
  }

  @scheduled({ interval: 60000, timeout: 5000 })
  public async update(): Promise<any> {
    if (this.current.status === "initializing") {
      this.current.status = "ready";
    }
    this.current.updated = Date.now();
    this.current.save();
    return await this.updateActiveNode();
  }

  private async updateActiveNode(): Promise<void> {
    this.active = await AutomationNode.findAll();
  }
}

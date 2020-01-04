import { autowired, postConstruct, scheduled, singleton } from "@xul/core";
import { EntityManager } from "@xul/data";
import md5 from "md5";
import os from "os";
import { AutomationNode } from "../model/AutomationNode";

@singleton()
export class NodeService {
  public current: AutomationNode = new AutomationNode();
  public active: AutomationNode[] = [];
  @autowired("xul.data.entityManager")
  public entityManager: EntityManager;
  @autowired(`xul.express.port`)
  public applicationPort: number;

  constructor() {
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
    Object.assign(this.current, { id, friendlyName, address, updated, port, url, status: "initializing" });
  }

  @postConstruct()
  public async initialize(): Promise<any> {
    const oldNode: AutomationNode = await this.entityManager.findOne(AutomationNode, this.current.id);
    if (oldNode) {
      this.current.friendlyName = oldNode.friendlyName;
    }
    await this.updateActiveNode();
    return await this.entityManager.save(this.current);
  }

  @scheduled({ interval: 60000 })
  public async update(): Promise<any> {
    if (this.current.status === "initializing") {
      this.current.status = "ready";
    }
    this.current.updated = Date.now();
    await this.entityManager.save(this.current);
    return await this.updateActiveNode();
  }

  private async updateActiveNode(): Promise<any> {
    this.active = await this.entityManager.findBy(AutomationNode, " updated > ?", Date.now() - 2*60 * 1000);
  }
}

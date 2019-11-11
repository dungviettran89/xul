import os from "os";
import { autowired, singleton } from "../../core/context/XulContext";
import { scheduled } from "../../core/mvc/SchedulingBeans";
import { GridPersistenceManager } from "../../core/persistence/GridPersistenceManager";
import { AutomationNode } from "../model/AutomationNode";

import md5 from "md5";

import { name } from "faker/locale/en_US";

import { camelCase } from "lodash";
import { postConstruct } from "../../core/mvc/InitializingBean";

@singleton()
export class NodeService {
  public current: AutomationNode = new AutomationNode();
  public active: AutomationNode[] = [];
  @autowired()
  public gridPersistenceManager: GridPersistenceManager;
  @autowired()
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
    const id: string = md5(address);
    const friendlyName: string = camelCase(name.findName());
    const updated: number = Date.now();
    const port: number = this.applicationPort;
    Object.assign(this.current, { id, friendlyName, address, updated, port, status: "initializing" });
  }

  @postConstruct()
  public async initialize() {
    const oldNode: AutomationNode = await this.gridPersistenceManager.findOne(AutomationNode, this.current.id);
    if (oldNode) {
      this.current.friendlyName = oldNode.friendlyName;
    }
    await this.updateActiveNode();
    return await this.gridPersistenceManager.save(this.current);
  }

  @scheduled({ interval: 60000 })
  public async update(): Promise<any> {
    if (this.current.status === "initializing") {
      this.current.status = "ready";
    }
    this.current.updated = Date.now();
    await this.gridPersistenceManager.save(this.current);
    return await this.updateActiveNode();
  }

  private async updateActiveNode(): Promise<any> {
    this.active = await this.gridPersistenceManager.findBy(AutomationNode, " updated > ?", Date.now() - 60 * 1000);
  }
}

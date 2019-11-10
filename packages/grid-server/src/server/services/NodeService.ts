import {autowired, singleton} from "../../core/context/GridContext";
import {scheduled} from "../../core/mvc/SchedulingBeans";
import {AutomationNode} from "../model/AutomationNode";
import {GridPersistenceManager} from "../../core/persistence/GridPersistenceManager";
import os from 'os';

import md5 from "md5";

import {name} from "faker/locale/en_US";

import {camelCase} from "lodash";
import {postConstruct} from "../../core/mvc/InitializingBean";

@singleton()
export class NodeService {
    public current: AutomationNode = new AutomationNode();
    public active: AutomationNode[] = [];
    @autowired()
    gridPersistenceManager: GridPersistenceManager;
    @autowired()
    applicationPort: number;

    constructor() {
        let networkInterfaces = os.networkInterfaces();
        let address: string = Object.keys(networkInterfaces)
            .map(i => networkInterfaces[i])
            .reduce((a, b) => a.concat(b), [])
            .filter(ni => ni.family === "IPv4")
            .map(ni => ni.address)
            .filter(a => a !== "127.0.0.1" && a !== "::1")
            .pop();
        let id: string = md5(address);
        let friendlyName: string = camelCase(name.findName());
        let updated: number = Date.now();
        let port: number = this.applicationPort;
        Object.assign(this.current, {id, friendlyName, address, updated, port, status: "initializing"});
    }

    @postConstruct()
    public async initialize() {
        let oldNode: AutomationNode = await this.gridPersistenceManager.findOne(AutomationNode, this.current.id);
        if (oldNode) this.current.friendlyName = oldNode.friendlyName;
        await this.updateActiveNode();
        return await this.gridPersistenceManager.save(this.current);
    }

    private async updateActiveNode(): Promise<any> {
        this.active = await this.gridPersistenceManager.findBy(AutomationNode, ' updated > ?', Date.now() - 60 * 1000);
    }

    @scheduled({interval: 60000})
    public async update(): Promise<any> {
        if (this.current.status === "initializing") this.current.status = "ready";
        this.current.updated = Date.now();
        await this.gridPersistenceManager.save(this.current);
        return await this.updateActiveNode();
    }

}
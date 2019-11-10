import {autowired, singleton} from "../../core/context/GridContext";
import {scheduled} from "../../core/mvc/SchedulingBeans";
import {AutomationNode} from "../model/AutomationNode";
import {GridPersistenceManager} from "../../core/persistence/GridPersistenceManager";
import os from 'os';

import md5 from "md5";

import {name} from "faker/locale/en_US";

import {camelCase} from "lodash";
import {onStart} from "../../core/mvc/InitializingBean";

@singleton()
export class NodeService {
    public current: AutomationNode = new AutomationNode();
    @autowired()
    gridPersistenceManager: GridPersistenceManager;

    constructor() {
        let networkInterfaces = os.networkInterfaces();
        let address: string = Object.keys(networkInterfaces)
            .map(i => networkInterfaces[i])
            .reduce((a, b) => a.concat(b), [])
            .map(ni => ni.address)
            .filter(a => a !== "127.0.0.1" && a !== "::1")
            .pop();
        let id: string = md5(address);
        let friendlyName: string = camelCase(name.findName());
        let updated: number = Date.now();
        Object.assign(this.current,{id, friendlyName, address, updated, status: "initializing"});
    }

    @onStart()
    public async initialize(){
        let oldNode:AutomationNode = await this.gridPersistenceManager.findOne(AutomationNode,this.current.id);
        if(oldNode)this.current.friendlyName = oldNode.friendlyName;
        return await this.gridPersistenceManager.save(this.current);
    }

    @scheduled({interval: 60000})
    public async update(): Promise<any> {
        if (this.current.status === "initializing") this.current.status = "ready";
        this.current.updated = Date.now();
        return await this.gridPersistenceManager.save(this.current)
    }
}
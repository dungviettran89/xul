import {Request, Response} from "express";
import {autowired, singleton} from "../../core/context/GridContext";
import {logger} from "../../core/GridLogger";
import {requestMapping} from "../../core/mvc/RequestMapping";
import {GridPersistenceManager} from "../../core/persistence/GridPersistenceManager";
import {AutomationNode} from "../model/AutomationNode";
import {NodeService} from "../services/NodeService";

@singleton()
@requestMapping("/api/node")
export class NodeController {
    @autowired()
    gridPersistenceManager: GridPersistenceManager;
    @autowired()
    nodeService: NodeService;

    @requestMapping()
    public async active(request: Request, response: Response): Promise<void> {
        response.json(await this.gridPersistenceManager.findBy(AutomationNode, ' updated > ?', Date.now() - 60 * 1000));
    }

    @requestMapping()
    public async current(request: Request, response: Response): Promise<void> {
        response.json(this.nodeService.current);
    }

    @requestMapping()
    public async all(request: Request, response: Response): Promise<void> {
        response.json(await this.gridPersistenceManager.findAll(AutomationNode));
    }
}

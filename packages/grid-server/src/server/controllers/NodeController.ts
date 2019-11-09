import {Request, Response} from "express";
import {autowired, singleton} from "../../core/context/GridContext";
import {logger} from "../../core/GridLogger";
import {requestMapping} from "../../core/mvc/RequestMapping";
import {GridPersistenceManager} from "../../core/persistence/GridPersistenceManager";
import {AutomationNode} from "../model/AutomationNode";

@singleton()
@requestMapping("/api/node")
export class NodeController {
    @autowired()
    gridPersistenceManager:GridPersistenceManager;
    @requestMapping()
    public async active(request: Request, response: Response): Promise<void> {
        logger.info(`NodeController.active()`);
        response.json({message: "Hello world"});
    }
    @requestMapping()
    public async current(request: Request, response: Response): Promise<void> {
        logger.info(`NodeController.current()`);
        response.json({message: "Hello world"});
    }

    @requestMapping()
    public async all(request: Request, response: Response): Promise<void> {
        logger.info(`NodeController.current()`);
        response.json(await this.gridPersistenceManager.findAll(AutomationNode));
    }
}

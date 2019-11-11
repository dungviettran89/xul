import { Request, Response } from "express";
import { autowired, singleton } from "../../core/context/XulContext";
import { requestMapping } from "../../core/mvc/RequestMapping";
import { GridPersistenceManager } from "../../core/persistence/GridPersistenceManager";
import { logger } from "../../core/XulLogger";
import { AutomationNode } from "../model/AutomationNode";
import { NodeService } from "../services/NodeService";

@singleton()
@requestMapping("/api/node")
export class NodeController {
  @autowired()
  public gridPersistenceManager: GridPersistenceManager;
  @autowired()
  public nodeService: NodeService;

  @requestMapping()
  public async active(request: Request, response: Response): Promise<void> {
    response.json(this.nodeService.active);
  }

  @requestMapping()
  public async current(request: Request, response: Response): Promise<void> {
    response.json(this.nodeService.current);
  }

  @requestMapping()
  public async all(request: Request, response: Response): Promise<void> {
    response.json(await this.gridPersistenceManager.findAll(AutomationNode));
  }

  @requestMapping()
  public async unknown(request: Request, response: Response) {
    response.status(404).send("Unknown node.");
  }
}

import { autowired, singleton } from "@xul/core";
import { requestMapping } from "@xul/express";
import { Request, Response } from "express";
import { NodeService } from "../service/NodeService";

@singleton()
@requestMapping("/api/node")
export class NodeController {
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
    response.json(this.nodeService.active);
  }

  @requestMapping()
  public async unknown(request: Request, response: Response) {
    response.status(404).send("Unknown node.");
  }
}

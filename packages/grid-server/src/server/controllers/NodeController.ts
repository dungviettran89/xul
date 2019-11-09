import {Request, Response} from "express";
import {singleton} from "../../core/GridContext";
import {logger} from "../../core/GridLogger";
import {requestMapping} from "../../core/GridServer";

@singleton()
@requestMapping("/api/node")
export class NodeController {
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
}

import { autowired, postConstruct, singleton } from "@xul/core";
import { Application } from "express";
import { IncomingMessage } from "http";
import proxy from "http-proxy-middleware";
import { LOGGER } from "../../server/Logger";
import { NodeService } from "../services/NodeService";

@singleton()
export class MeshController {
  @autowired()
  public nodeService: NodeService;
  @autowired(`xul.express.application`)
  public application: Application;
  @autowired(`xul.express.port`)
  public applicationPort: number;

  @postConstruct()
  public async initialize() {
    const defaultTarget = `http://127.0.0.1:${this.applicationPort}/api/node/unknown`;
    this.application.use(
      proxy("/_mesh", {
        changeOrigin: true,
        pathRewrite: {
          ".*": ""
        },

        router: (request: IncomingMessage): any => {
          const match = request.url.match(/\/_mesh\/([a-zA-Z0-9]*?)\/(.*)/);
          if (!match || match.length !== 3) {
            return defaultTarget;
          }
          const name = match[1];
          const path = match[2];
          const target = this.nodeService.active.find(n => n.friendlyName === name || n.id === name);
          if (!target) {
            return defaultTarget;
          }
          const targetPath = `http://${target.address}:${target.port}/${path}`;
          LOGGER.info(`MessController.router() Forwarding ${request.url} to ${targetPath}`);
          return targetPath;
        },
        target: "http://127.0.0.1:6080",
        ws: true
      })
    );
  }
}

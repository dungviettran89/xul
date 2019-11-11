import { Application } from "express";
import { IncomingMessage } from "http";
import proxy from "http-proxy-middleware";
import { autowired, singleton } from "../../core/context/XulContext";
import { postConstruct } from "../../core/mvc/InitializingBean";
import { logger } from "../../core/XulLogger";
import { NodeService } from "../services/NodeService";

const UNKNOWN_TARGET = "http://127.0.0.1:8080/api/node/unknown";

@singleton()
export class MeshController {
  @autowired()
  public nodeService: NodeService;
  @autowired()
  public application: Application;

  @postConstruct()
  public async initialize() {
    this.application.use(
      proxy("/_mesh", {
        changeOrigin: true,
        logProvider: () => logger,
        pathRewrite: {
          ".*": ""
        },

        router: (request: IncomingMessage): any => {
          const match = request.url.match(/\/_mesh\/([a-zA-Z0-9]*?)\/(.*)/);
          if (!match || match.length !== 3) {
            return UNKNOWN_TARGET;
          }
          const name = match[1];
          const path = match[2];
          const target = this.nodeService.active.find(n => n.friendlyName === name || n.id === name);
          if (!target) {
            return UNKNOWN_TARGET;
          }
          const targetPath = `http://${target.address}:${target.port}/${path}`;
          logger.info(`MessController.router() Forwarding ${request.url} to ${targetPath}`);
          return targetPath;
        },
        target: "http://127.0.0.1:6080",
        ws: true
      })
    );
  }
}

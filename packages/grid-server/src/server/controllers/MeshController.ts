import {autowired, singleton} from "../../core/context/GridContext";
import {NodeService} from "../services/NodeService";
import {postConstruct} from "../../core/mvc/InitializingBean";
import {Application} from "express";
import proxy from "http-proxy-middleware";
import {IncomingMessage} from "http";
import {logger} from "../../core/GridLogger";

const UNKNOWN_TARGET = 'http://127.0.0.1:8080/api/node/unknown';

@singleton()
export class MessController {
    @autowired()
    nodeService: NodeService;
    @autowired()
    application: Application;

    @postConstruct()
    public async initialize() {
        this.application.use(proxy('/_mesh', {
            target: 'http://127.0.0.1:6080',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '.*': '',
            },
            logProvider: () => logger,
            router: (request: IncomingMessage): any => {
                let match = request.url.match(/\/_mesh\/([a-zA-Z0-9]*?)\/(.*)/);
                if (!match || match.length != 3) return UNKNOWN_TARGET;
                let name = match[1];
                let path = match[2];
                let target = this.nodeService.active.find(n => n.friendlyName === name || n.id === name);
                if (!target) return UNKNOWN_TARGET;
                let targetPath = `http://${target.address}:${target.port}/${path}`;
                logger.info(`MessController.router() Forwarding ${request.url} to ${targetPath}`);
                return targetPath;
            }
        }));
    }
}
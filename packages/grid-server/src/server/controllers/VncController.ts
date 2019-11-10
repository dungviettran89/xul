import {autowired, singleton} from "../../core/context/GridContext";
import {Application} from "express";
import {postConstruct} from "../../core/mvc/InitializingBean";

import proxy from "http-proxy-middleware";

@singleton()
export class VncController {
    @autowired()
    application: Application;

    @postConstruct()
    public start() {
        this.application.use(proxy(['/vnc','/websockify'], {
            target: 'http://127.0.0.1:6080',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/vnc': '',
            }
        }));
    }
}
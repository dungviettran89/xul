import { Application } from "express";
import { autowired, singleton } from "../../core/context/XulContext";
import { postConstruct } from "../../core/mvc/InitializingBean";

import proxy from "http-proxy-middleware";

@singleton()
export class VncController {
  @autowired()
  public application: Application;

  @postConstruct()
  public start() {
    this.application.use(
      proxy(["/vnc", "/websockify"], {
        changeOrigin: true,

        pathRewrite: {
          "^/vnc": ""
        },
        target: "http://127.0.0.1:6080",
        ws: true
      })
    );
  }
}

import { Application } from "express";

import { autowired, postConstruct, singleton } from "@xul/core";
import proxy from "http-proxy-middleware";

/**
 * Headless is default now. Will refactor to this to be more dynamic
 */
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

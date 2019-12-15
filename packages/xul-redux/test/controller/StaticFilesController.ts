import { autowired, postConstruct, singleton } from "@xul/core";
import { requestMapping } from "@xul/express";
import express, { Application, Request, Response } from "express";
@singleton()
@requestMapping("api/test")
export class StaticFilesController {
  @autowired(`xul.express.application`)
  public application: Application;

  @postConstruct()
  public async postConstruct() {
    this.application.use(express.static("test"));
    this.application.use(express.static("node_modules"));
  }

  @requestMapping("debug")
  public debug(req: Request, res: Response) {
    res.json("OK");
  }
}

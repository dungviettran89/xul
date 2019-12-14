import { autowired, postConstruct, singleton } from "@xul/core";
import { requestMapping } from "@xul/express";
import express, { Application, Request, Response } from "express";
@singleton()
@requestMapping("api/test")
export class StaticFilesController {
  @autowired(`xul.server.application`)
  public application: Application;

  @postConstruct()
  public async postConstruct() {
    console.log(`Serving static files in test folder`);
    this.application.use(express.static("./"));
  }

  @requestMapping("debug")
  public debug(req: Request, res: Response) {
    res.json("OK");
  }
}

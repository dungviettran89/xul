import { autowired, onStart, singleton } from "@xul/core";
import express, { Application } from "express";

@singleton()
export class StaticFileController {
  @autowired(`xul.express.application`)
  public application: Application;
  @onStart()
  public start() {
    this.application.use(express.static("../xul-ui/build"));
  }
}

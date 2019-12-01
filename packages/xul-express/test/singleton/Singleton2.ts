import { autowired, postConstruct, singleton } from "@xul/core";
import { Request, Response } from "express";
import { LOGGER } from "../../src/Logger";
import { requestMapping } from "../../src/RequestMappings";
import { AbstractSingleton } from "./AbstractSingleton";
import { Singleton1 } from "./Singleton1";

@singleton()
@requestMapping()
class Singleton2 extends AbstractSingleton {
  @autowired()
  public singleton1: Singleton1;

  @postConstruct()
  public async start(): Promise<void> {
    if (!this.singleton1) {
      throw new Error(`Autowired failed, field is null`);
    }
    LOGGER.d(`singleton2 started successfully.`);
  }

  @requestMapping({ method: "get", path: "api/s2/get" })
  public async get(request: Request, response: Response) {
    response.json({ message: "get" });
  }

  @requestMapping({ method: "post", path: "api/s2/post" })
  public async post(request: Request, response: Response) {
    response.json({ message: "post" });
  }

  @requestMapping({ method: "put", path: "api/s2/put" })
  public async put(request: Request, response: Response) {
    response.json({ message: "put" });
  }
}

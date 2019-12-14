import {autowired, postConstruct, singleton} from "@xul/core";
import express, {Application} from "express";
@singleton()
export class StaticFilesController {
    @autowired(`xul.server.application`)
    public application:Application;

    @postConstruct()
    public start()  {
        console.log(`Serving static files in test folder`);
        this.application.use(express.static('./'));
    };
}
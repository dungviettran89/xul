import { singleton } from "../../src/Index";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
export class Singleton1 extends AbstractSingleton {}

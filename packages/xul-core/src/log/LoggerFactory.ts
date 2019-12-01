import { ConsoleLogger } from "./ConsoleLogger";
import { ILogger } from "./Logger";
export const loggers: Map<string, ILogger> = new Map();
export const getLogger = (option?: any): ILogger => {
  if (option === undefined) {
    option = "";
  }
  if (typeof option === "function") {
    option = option.name;
  }
  const prefix: string = option.toString();
  if (!loggers.has(prefix)) {
    loggers.set(prefix, new ConsoleLogger(prefix));
  }
  return loggers.get(prefix);
};
export const logger = getLogger;
export const rootLogger = getLogger("");

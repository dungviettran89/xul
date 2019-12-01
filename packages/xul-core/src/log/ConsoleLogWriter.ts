import { ILogWriter } from "./Log";

export class ConsoleLogWriter implements ILogWriter {
  public log(level: string, message?: any, ...optionalParams: any[]): void {
    if (level === "debug") {
      level = "log";
    }
    (console as any)[level](message, ...optionalParams);
  }
}

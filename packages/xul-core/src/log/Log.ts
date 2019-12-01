import { ConsoleLogWriter } from "./ConsoleLogWriter";

export class Log {
  public defaultPrefix: string = "application";
  public level: LogLevel = "trace";
  public writer: ILogWriter = new ConsoleLogWriter();

  public d(context: any, message?: any, ...optionalParams: any[]) {
    this._log(context, "debug", message, ...optionalParams);
  }

  public debug(context: any, message?: any, ...optionalParams: any[]) {
    this.d(context, message, ...optionalParams);
  }

  public i(context: any, message?: any, ...optionalParams: any[]) {
    this._log(context, "info", message, ...optionalParams);
  }

  public info(context: any, message?: any, ...optionalParams: any[]) {
    this.i(context, message, ...optionalParams);
  }

  public t(context: any, message?: any, ...optionalParams: any[]) {
    this._log(context, "trace", message, ...optionalParams);
  }

  public trace(context: any, message?: any, ...optionalParams: any[]) {
    this.t(context, message, ...optionalParams);
  }

  public w(context: any, message?: any, ...optionalParams: any[]) {
    this._log(context, "warn", message, ...optionalParams);
  }

  public warn(context: any, message?: any, ...optionalParams: any[]) {
    this.w(context, message, ...optionalParams);
  }

  public e(context: any, message?: any, ...optionalParams: any[]) {
    this._log(context, "error", message, ...optionalParams);
  }

  public error(context: any, message?: any, ...optionalParams: any[]) {
    this.e(context, message, ...optionalParams);
  }

  private _log(context: any, level: string, message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get(level)) {
      return;
    }
    const prefix: string = typeof context === "string" ? context : (context && context.constructor.name) || this.defaultPrefix;
    const logDate = new Date().toISOString();
    const logLevel = level.toUpperCase().padEnd(7);
    const logPrefix = prefix.padStart(12);
    message = `${logDate} ${logLevel} [${logPrefix}] ${message}`;
    this.writer.log(level, message, ...optionalParams);
  }
}
export interface ILogWriter {
  log(level: string, message?: any, ...optionalParams: any[]): void;
}
export const LOG = new Log();
export type LogLevel = "info" | "trace" | "warn" | "error" | "debug";
export const LevelMap: Map<string, number> = new Map();
LevelMap.set("trace", 0);
LevelMap.set("debug", 3);
LevelMap.set("info", 5);
LevelMap.set("warn", 7);
LevelMap.set("error", 9);

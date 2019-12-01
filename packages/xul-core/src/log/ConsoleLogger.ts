import { ILogger } from "./Logger";
import { getLogLevel, LEVEL_MAP } from "./LogLevel";

export class ConsoleLogger implements ILogger {
  private static MAX_PREFIX_LENGTH = 20;

  private prefix: string;
  private prefixDisplay: string;
  constructor(prefix?: string) {
    this.prefix = prefix || "";
    this.prefixDisplay = this.limit(this.prefix, ConsoleLogger.MAX_PREFIX_LENGTH);
  }
  public log(message?: any, ...optionalParams: any[]): void {
    this._log("log", message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    this._log("error", message, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    this._log("info", message, ...optionalParams);
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    this._log("trace", message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    this._log("warn", message, ...optionalParams);
  }
  private _log(level: string, message?: any, ...optionalParams: any[]): void {
    if (getLogLevel(this.prefix) > LEVEL_MAP.get(level)) {
      return;
    }
    (console as any)[level](`${new Date().toISOString()} [${level.padEnd(7)}] ${this.prefixDisplay}: ${message}`, ...optionalParams);
  }

  private limit(prefix: string, max: number): string {
    prefix = prefix.length > max ? prefix.substr(prefix.length - max, max) : prefix;
    prefix = prefix.padStart(max);
    return prefix;
  }
}

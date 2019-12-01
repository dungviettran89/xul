import { LevelMap, LOG, LogLevel } from "./Log";

export class Logger {
  public level: LogLevel;
  public context: any;
  constructor(context: any, level?: LogLevel) {
    this.context = context;
    this.level = level || "info";
  }

  public d(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("debug")) {
      return;
    }
    LOG.d(this.context, message, ...optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("debug")) {
      return;
    }
    LOG.debug(this.context, message, ...optionalParams);
  }

  public i(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("info")) {
      return;
    }
    LOG.i(this.context, message, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("info")) {
      return;
    }
    LOG.info(this.context, message, ...optionalParams);
  }

  public t(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("trace")) {
      return;
    }
    LOG.t(this.context, message, ...optionalParams);
  }

  public trace(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("trace")) {
      return;
    }
    LOG.trace(this.context, message, ...optionalParams);
  }

  public w(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("warn")) {
      return;
    }
    LOG.w(this.context, message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("warn")) {
      return;
    }
    LOG.warn(this.context, message, ...optionalParams);
  }

  public e(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("error")) {
      return;
    }
    LOG.e(this.context, message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]) {
    if (LevelMap.get(this.level) > LevelMap.get("error")) {
      return;
    }
    LOG.error(this.context, message, ...optionalParams);
  }
}

const LOG_LEVELS: Map<string, Level> = new Map();
let LOG_KEYS: string[] = [];

export type Level = "error" | "info" | "log" | "warn" | "trace";
export const LEVEL_MAP: Map<string, number> = new Map();
LEVEL_MAP.set("trace", 0);
LEVEL_MAP.set("info", 1);
LEVEL_MAP.set("log", 1);
LEVEL_MAP.set("warn", 2);
LEVEL_MAP.set("error", 3);

export const ROOT: string = "root";
export const setRootLogLevel = (level: Level) => {
  setLogLevel("root", level);
};
export const setLogLevel = (name: string, level: Level) => {
  LOG_LEVELS.set(name, level);
  LOG_KEYS = [...LOG_KEYS, name]
    .slice()
    .sort()
    .reverse();
};
export const getLogLevel = (name: string): number => {
  for (const key of LOG_KEYS) {
    if (name.startsWith(key)) {
      return LEVEL_MAP.get(LOG_LEVELS.get(key));
    }
  }
  return LEVEL_MAP.get(LOG_LEVELS.get(ROOT));
};
setRootLogLevel("warn");

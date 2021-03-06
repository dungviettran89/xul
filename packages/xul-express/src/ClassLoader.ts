import { context } from "@xul/core";
import globs from "globs";
import path from "path";
export class ClassLoader {
  public static async run(options: { baseDir?: string; extensions?: string[]; onStart?: () => any }): Promise<void> {
    const extensions = options.extensions || ["ts", "tsx", "js", "jsx"];
    const baseDir = options.baseDir || path.dirname(require.main.filename);
    const extension = new RegExp(`\\.(${extensions.join("|")})`, "g");
    const relative = path.relative(__dirname, baseDir);
    globs(`${baseDir}/**/*.{${extensions.join(",")}}`, async (err, files) => {
      files.forEach(f => {
        f = f.replace(extension, "");
        f = f.replace(baseDir, relative);
        require(f);
      });
      await context.initialize();
      await safeInvoke(options.onStart);
    });
  }
}
const safeInvoke = async (callable?: () => any): Promise<void> => {
  if (callable === undefined) {
    return;
  }
  const promiseLike: Promise<any> = Promise.resolve(callable());
  if (promiseLike) {
    await promiseLike;
  }
};

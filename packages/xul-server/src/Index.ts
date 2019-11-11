import globs from "globs";
import { xulServer } from "./core/mvc/XulServer";

globs(`${__dirname}/server/**/*.ts`, (err, files) => {
  files.forEach(f => {
    const name = f.replace(".ts", "").replace(__dirname, ".");
    require(name);
  });
  xulServer.start();
});

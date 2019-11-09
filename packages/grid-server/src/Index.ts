import globs from "globs";
import {gridServer} from "./core/mvc/GridServer";

globs(`${__dirname}/server/**/*.ts`, (err, files) => {
    files.forEach((f) => {
        const name = f.replace(".ts", "").replace(__dirname, ".");
        require(name);
    });
    gridServer.start();
});

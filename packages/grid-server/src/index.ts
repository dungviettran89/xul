import globs from "globs";
import winston from "winston";
const logger = winston.createLogger({
    format: winston.format.simple(),
    level: "debug",
    transports: [
        new winston.transports.Console(),
    ],
});
globs(`${__dirname}/server/**/*.ts`, (err, files) => {
    files.forEach((f) => {
        const name = f.replace(".ts", "").replace(__dirname, ".");
        require(name);
        logger.info(`Loaded ${name}`);
    });
});

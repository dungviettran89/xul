import { ClassLoader } from "@xul/express";
import "./core/mvc/XulServer";

const start = Date.now();
ClassLoader.run({
  onStart: () => {
    const duration = Date.now() - start;
    console.log(`Application started after ${duration}ms.`);
  }
});

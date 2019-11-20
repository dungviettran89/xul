import { ClassLoader } from "@xul/core/lib/ClassLoader";
import "./core/mvc/XulServer";

const start = Date.now();
ClassLoader.run({
  onStart: () => {
    const duration = Date.now() - start;
    console.log(`Application started after ${duration}ms.`);
  }
});

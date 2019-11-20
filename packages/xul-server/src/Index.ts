import { ClassLoader } from "@xul/core/lib/ClassLoader";
import "./core/mvc/XulServer";
ClassLoader.run({
  onStart: () => {
    console.log(`Application started.`);
  }
});

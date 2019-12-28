import { LOGGER } from "../Logger";
import { createRedux } from "../ReduxState";

export const litState = createRedux((clazz: any, start: (stateChanged: () => void) => void, stop: () => void): any => {
  return class extends clazz {
    public connectedCallback() {
      LOGGER.d(`connectedCallback() invoked`);
      start(() => {
        LOGGER.d(`stateChanged() invoked. `);
        this.requestUpdate();
      });
      if (typeof super.connectedCallback === "function") {
        super.connectedCallback();
      }
    }

    public disconnectedCallback() {
      LOGGER.d(`disconnectedCallback() invoked`);
      stop();
      if (typeof super.disconnectedCallback === "function") {
        super.disconnectedCallback();
      }
    }
  };
});

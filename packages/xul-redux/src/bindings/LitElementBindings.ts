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
      super.connectedCallback();
    }

    public disconnectedCallback() {
      LOGGER.d(`disconnectedCallback() invoked`);
      stop();
      super.disconnectedCallback();
    }
  };
});

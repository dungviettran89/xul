import { LOGGER } from "../Logger";
import { createRedux } from "../ReduxState";

export const reactState = createRedux((clazz: any, start: (stateChanged: () => void) => void, stop: () => void) => {
  return class extends clazz {
    public componentDidMount() {
      LOGGER.d(`componentDidMount() invoked`);
      start(() => {
        LOGGER.d(`stateChanged() invoked. `);
        this.setState(this);
      });
      if (typeof super.componentDidMount === "function") {
        super.componentDidMount();
      }
    }

    public componentWillUnmount() {
      LOGGER.d(`componentWillUnmount() invoked`);
      stop();
      if (typeof super.componentWillUnmount === "function") {
        super.componentWillUnmount();
      }
    }
  };
});

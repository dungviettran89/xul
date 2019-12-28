import { createRedux } from "../ReduxState";

export const noopState = createRedux(clazz => clazz);

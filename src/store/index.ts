import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { quizReducer } from "./reducers/quizReducer";
import logger from "./middleware/logger";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  quizReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export type RootState = ReturnType<typeof store.getState>;

export default store;

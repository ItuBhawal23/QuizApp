import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { quizReducer } from "./reducers/quizReducer";
import logger from "./middleware/logger";

const store = createStore(quizReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;

export default store;

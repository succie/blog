import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import menu, { Menu } from "./menu";
import articles, { Article } from "./articles";
import rootSaga from "../sagas";

export type RootState = {
  menu: Menu;
  articles: Article[];
};

const reducer = combineReducers({
  menu,
  articles
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;

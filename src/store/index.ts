import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import articles, { ArticleReducer } from "./articles";

export type RootState = {
  articles: ArticleReducer;
};

const reducer = combineReducers({
  articles
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;

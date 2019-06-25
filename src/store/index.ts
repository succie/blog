import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import articles, { ArticleReducer } from "./articles";
import auth, { Auth } from "./auth";

export type RootState = {
  articles: ArticleReducer;
  auth: Auth;
};

const reducer = combineReducers({
  articles,
  auth
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;

import { takeLatest } from "redux-saga/effects";
import { articlesActionTypes, getArticles } from "./store/articles";

export default function* rootSaga() {
  yield takeLatest(articlesActionTypes.GET_ARTICLES_REQUEST, getArticles);
}

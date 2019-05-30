import { takeLatest } from "redux-saga/effects";
import { articlesActionTypes, getArticles, postArticle } from "./store/articles";

export default function* rootSaga() {
  yield takeLatest(articlesActionTypes.GET_ARTICLES_REQUEST, getArticles);
  yield takeLatest(articlesActionTypes.POST_ARTICLES_REQUEST, postArticle);
}

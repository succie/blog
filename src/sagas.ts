import { takeLatest } from "redux-saga/effects";
import { articlesActionTypes, getArticles, postArticle } from "./store/articles";
import { AuthActionTypes, signin } from "./store/auth";

export default function* rootSaga() {
  yield takeLatest(articlesActionTypes.GET_ARTICLES_REQUEST, getArticles);
  yield takeLatest(articlesActionTypes.POST_ARTICLES_REQUEST, postArticle);
  yield takeLatest(AuthActionTypes.AUTH_SIGNIN_REQUEST, signin)
}

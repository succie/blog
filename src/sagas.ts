import { takeLatest } from "redux-saga/effects";
import { articlesActionTypes, getArticles, postArticle } from "./store/articles";
import { AuthActionTypes, signIn, signout, confirmSignIn } from "./store/auth";

export default function* rootSaga() {
  yield takeLatest(articlesActionTypes.GET_ARTICLES_REQUEST, getArticles);
  yield takeLatest(articlesActionTypes.POST_ARTICLES_REQUEST, postArticle);
  yield takeLatest(AuthActionTypes.AUTH_SIGNIN_REQUEST, signIn)
  yield takeLatest(AuthActionTypes.AUTH_SIGNOUT_REQUEST, signout);
  yield takeLatest(AuthActionTypes.AUTH_CONFIRM_SIGNIN_REQUEST, confirmSignIn);
}

import articlesData from "../../data/articles.json";
import { delay, put } from "redux-saga/effects";

export type Article = {
  title: string;
  body: string;
  genre: string;
  created_at: number;
  updated_at: number;
};

export enum articlesActionTypes {
  GET_ARTICLES_REQUEST = "GET_ARTICLES_REQUEST",
  GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS",
  GET_ARTICLES_FAILED = "GET_ARTICLES_FAILED"
}

export const articlesAction = {
  getArticlesRequest: () => {
    return {
      type: articlesActionTypes.GET_ARTICLES_REQUEST,
      isFetching: true
    };
  },
  getArticlesSuccess: (articles: Article[]) => {
    return {
      type: articlesActionTypes.GET_ARTICLES_SUCCESS,
      articles,
      isFetching: false
    };
  },
  getArticlesFailed: (error: Error) => {
    return {
      type: articlesActionTypes.GET_ARTICLES_FAILED,
      error,
      isFetching: false
    };
  }
};

// TODO: articles を firebase から持ってくるようにする
export function* getArticles() {
  yield delay(3000);
  try {
    yield put(articlesAction.getArticlesSuccess(articlesData));
  } catch (err) {
    yield put(articlesAction.getArticlesFailed(err));
  }
}

const articles = (state: Article[] = [], action: any) => {
  switch (action.type) {
    case articlesActionTypes.GET_ARTICLES_SUCCESS:
      return action.articles;
    case articlesActionTypes.GET_ARTICLES_FAILED:
      return action.error;
    default:
      return state;
  }
};

export default articles;

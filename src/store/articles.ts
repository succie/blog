import { put, call } from "redux-saga/effects";
import { firestore } from "../utils/firebase";

export type Article = {
  title: string;
  body: string;
  genre: string;
  created_at: firebase.firestore.Timestamp;
  updated_at: firebase.firestore.Timestamp;
};

export enum articlesActionTypes {
  GET_ARTICLES_REQUEST = "GET_ARTICLES_REQUEST",
  GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS",
  GET_ARTICLES_FAILED = "GET_ARTICLES_FAILED",
  POST_ARTICLES_REQUEST = "POST_ARTICLES_REQUEST",
  POST_ARTICLES_SUCCESS = "POST_ARTICLES_SUCCESS",
  POST_ARTICLES_FAILED = "POST_ARTICLES_FAILED"
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
  },
  postArticlesRequest: (article: Article) => {
    return {
      type: articlesActionTypes.POST_ARTICLES_REQUEST,
      article,
      isFetching: true
    };
  },
  postArticlesSuccess: () => {
    return {
      type: articlesActionTypes.POST_ARTICLES_SUCCESS,
      isFetching: false
    };
  },
  postArticlesFailed: (error: Error) => {
    return {
      type: articlesActionTypes.POST_ARTICLES_FAILED,
      error,
      isFetching: false
    };
  }
};

async function fetchFirestore() {
  const snapShot = await firestore.collection("articles").orderBy("updated_at", "desc").get();

  const data = snapShot.docs.map((doc: any) => {
    return doc.data();
  });
  return data;
}

async function postFirestore(article: Article) {
  await firestore.collection("articles").add(article);
}

export function* getArticles() {
  const articles = yield call(fetchFirestore);
  try {
    yield put(articlesAction.getArticlesSuccess(articles));
  } catch (err) {
    yield put(articlesAction.getArticlesFailed(err));
  }
}

export function* postArticle(action: any) {
  yield call(postFirestore, action.article);
  try {
    yield put(articlesAction.postArticlesSuccess());
  } catch (err) {
    yield put(articlesAction.postArticlesFailed(err));
  }
}

const articles = (state: Article[] = [], action: any) => {
  switch (action.type) {
    case articlesActionTypes.GET_ARTICLES_SUCCESS:
      return action.articles;
    case articlesActionTypes.GET_ARTICLES_FAILED:
      return action.error;
    case articlesActionTypes.POST_ARTICLES_REQUEST:
      return [action.article, ...state];
    default:
      return state;
  }
};

export default articles;

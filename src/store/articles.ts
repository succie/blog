import { firestore } from "firebase/app";

export type Article = {
  title: string;
  body: string;
  genre: string;
  created_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};

export enum ArticlesActionTypes {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILUER = "FETCH_ARTICLES_FAILUER"
}

type FetchArticlesRequest = {
  type: ArticlesActionTypes.FETCH_ARTICLES_REQUEST;
  isFetching: boolean;
};

type FetchArticlesSuccess = {
  type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS;
  isFetching: boolean;
  payload: {
    articles: Article[];
  };
};

type FetchArticlesFailuer = {
  type: ArticlesActionTypes.FETCH_ARTICLES_FAILUER;
  isFetching: boolean;
  payload: {
    error: Error;
  };
};

type ArticlesActions =
  | FetchArticlesRequest
  | FetchArticlesSuccess
  | FetchArticlesFailuer;

export const articlesActions = {
  fetchArticlesRequest: () => {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_REQUEST,
      isFetching: true
    };
  },
  fetchArticlesSuccess: (articles: Article[]) => {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS,
      isFetching: false,
      payload: {
        articles
      }
    };
  },
  fetchArticlesFailuer: (error: Error) => {
    return {
      type: ArticlesActionTypes.FETCH_ARTICLES_FAILUER,
      isFetching: false,
      payload: {
        error
      }
    };
  }
};

export type ArticleReducer = {
  isFetching: boolean;
  articles?: Article[];
  error?: Error;
};

const initialState: ArticleReducer = {
  isFetching: false,
  articles: []
};

const articles = (state = initialState, action: ArticlesActions) => {
  switch (action.type) {
    case ArticlesActionTypes.FETCH_ARTICLES_REQUEST:
      return { isFetching: action.isFetching };
    case ArticlesActionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        isFetching: action.isFetching,
        articles: action.payload.articles
      };
    case ArticlesActionTypes.FETCH_ARTICLES_FAILUER:
      return { isFetching: action.isFetching, error: action.payload.error };
    default:
      return state;
  }
};

export default articles;

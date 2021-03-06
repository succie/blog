type Async = {
  isFetching: boolean;
  error?: Error;
};

export type Auth = {
  isSignIn: boolean;
} & Async;

export enum AuthActionTypes {
  FETCH_SIGNIN_REQUEST = "FETCH_SIGNIN_REQUEST",
  FETCH_SIGNIN_SUCCESS = "FETCH_SIGNIN_SUCCESS",
  FETCH_SIGNIN_FAILUER = "FETCH_SIGNIN_FAILUER",
  CONFIRM_SIGNIN = "CONFIRM_SIGNIN"
}

type FetchSignInRequest = {
  type: AuthActionTypes.FETCH_SIGNIN_REQUEST;
  isFetching: boolean;
};

type FetchSignInSuccess = {
  type: AuthActionTypes.FETCH_SIGNIN_SUCCESS;
  isFetching: boolean;
  payload: {
    auth: Auth;
  };
};

type FetchSignInFailuer = {
  type: AuthActionTypes.FETCH_SIGNIN_FAILUER;
  isFetching: boolean;
  payload: {
    error?: Error;
  };
};

type ConfirmSignIn = {
  type: AuthActionTypes.CONFIRM_SIGNIN;
  payload: {
    isSignIn: boolean;
  };
};

type AuthActions =
  | FetchSignInRequest
  | FetchSignInSuccess
  | FetchSignInFailuer
  | ConfirmSignIn;

export const authActions = {
  fetchSignInRequest: () => {
    return {
      type: AuthActionTypes.FETCH_SIGNIN_REQUEST,
      isFetching: true
    };
  },
  fetchSignInSuccess: () => {
    return {
      type: AuthActionTypes.FETCH_SIGNIN_SUCCESS,
      isFetching: false,
      payload: {
        auth: {
          isSignIn: true
        }
      }
    };
  },
  fetchSignInFailuer: (error?: Error) => {
    return {
      type: AuthActionTypes.FETCH_SIGNIN_FAILUER,
      isFetching: false,
      payload: {
        error
      }
    };
  },
  confirmSignIn: (isSignIn: boolean) => {
    return {
      type: AuthActionTypes.CONFIRM_SIGNIN,
      payload: {
        isSignIn
      }
    };
  }
};

const initialState: Auth = {
  isFetching: false,
  isSignIn: false
};

const auth = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.FETCH_SIGNIN_REQUEST:
      return { ...state, isFetching: action.isFetching };
    case AuthActionTypes.FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isSignIn: action.payload.auth.isSignIn
      };
    case AuthActionTypes.FETCH_SIGNIN_FAILUER:
      return {
        ...state,
        isFetching: action.isFetching,
        error: action.payload.error
      };
    case AuthActionTypes.CONFIRM_SIGNIN:
      return {
        ...state,
        isSignIn: action.payload.isSignIn
      };
    default:
      return state;
  }
};

export default auth;

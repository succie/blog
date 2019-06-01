import { call, put } from "redux-saga/effects";
import firebase from "firebase/app";
import { firebaseAuth } from "../utils/firebase";

export interface Auth {
  isSignin: boolean;
  error?: Error;
}

export enum AuthActionTypes {
  AUTH_SIGNIN_REQUEST = "AUTH_SIGNIN_REQUEST",
  AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS",
  AUTH_SIGNIN_FAILED = "AUTH_SIGNIN_FAILED",
  AUTH_SIGNOUT = "AUTH_SIGNOUT"
}

export const AuthActions = {
  authSigninRequest: (email: string, password: string) => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_REQUEST,
      payload: {
        email,
        password
      }
    };
  },
  authSigninSuccess: () => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_SUCCESS,
      isSignin: true
    };
  },
  authSigninFailed: (error: Error) => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_FAILED,
      error
    };
  },
  authSignout: () => {
    return {
      type: AuthActionTypes.AUTH_SIGNOUT
    };
  }
};

async function fetchFirestbaseAuth(email: string, password: string) {
  const isSignin = await firebaseAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => true)
        .catch(error => error);
    });

  return isSignin;
}

export function* signin(action: any) {
  try {
    yield call(
      fetchFirestbaseAuth,
      action.payload.email,
      action.payload.password
    );
    yield put(AuthActions.authSigninSuccess());
  } catch (error) {
    yield put(AuthActions.authSigninFailed(error));
  }
}

const auth = (state: Auth = {isSignin: false}, action: any) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_SIGNIN_SUCCESS:
      return { ...state, isSignin: action.isSignin };
    case AuthActionTypes.AUTH_SIGNIN_FAILED:
      return { ...state, isSignin: false, error: action.error };
    case AuthActionTypes.AUTH_SIGNOUT:
      return { ...state, isSignin: false };
    default:
      return state;
  }
};

export default auth;

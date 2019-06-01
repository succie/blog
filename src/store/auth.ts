import { call, put } from "redux-saga/effects";
import firebase from "firebase/app";
import { firebaseAuth } from "../utils/firebase";

export interface Auth {
  isSignIn: boolean;
  error?: Error;
}

export enum AuthActionTypes {
  AUTH_SIGNIN_REQUEST = "AUTH_SIGNIN_REQUEST",
  AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS",
  AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE",

  AUTH_SIGNOUT_REQUEST = "AUTH_SIGNOUT_REQUEST",
  AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS",
  AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE",

  AUTH_CONFIRM_SIGNIN_REQUEST = "AUTH_CONFIRM_SIGNIN_REQUEST",
  AUTH_CONFIRM_SIGNIN_SUCCESS = "AUTH_CONFIRM_SIGNIN_SUCCESS"
}

export const AuthActions = {
  // Sign in actions
  authSignInRequest: (email: string, password: string) => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_REQUEST,
      payload: {
        email,
        password
      }
    };
  },
  authSignInSuccess: () => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_SUCCESS,
      isSignIn: true
    };
  },
  authSignInFailure: (error: Error) => {
    return {
      type: AuthActionTypes.AUTH_SIGNIN_FAILURE,
      error
    };
  },

  // Sign out actions
  authSignOutRequest: () => {
    return {
      type: AuthActionTypes.AUTH_SIGNOUT_REQUEST
    };
  },
  authSignOutSuccess: () => {
    return {
      type: AuthActionTypes.AUTH_SIGNOUT_SUCCESS,
      isSignIn: false
    };
  },
  authSignOutFailure: (error: Error) => {
    return {
      type: AuthActionTypes.AUTH_SIGNOUT_FAILURE,
      error
    };
  },

  // Confirm sign in actions
  authConfirmSignInRequest: () => {
    return {
      type: AuthActionTypes.AUTH_CONFIRM_SIGNIN_REQUEST
    };
  },
  authConfirmSignInSuccess: (isSignIn: boolean) => {
    return {
      type: AuthActionTypes.AUTH_CONFIRM_SIGNIN_SUCCESS,
      isSignIn
    };
  }
};

// Firebase actions
async function fetchFirebaseAuthSignIn(email: string, password: string) {
  return firebaseAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          return;
        })
        .catch(err => {
          throw err;
        });
    });
}

async function fetchFirebaseAuthSignOut() {
  return firebaseAuth
    .signOut()
    .then(() => {
      return;
    })
    .catch(err => {
      throw err;
    });
}

async function fetchFirebaseAuthConfirmSignIn() {
  return firebaseAuth.onAuthStateChanged(user => user);
}

// Saga actions
export function* signIn(action: any) {
  try {
    yield call(
      fetchFirebaseAuthSignIn,
      action.payload.email,
      action.payload.password
    );
    yield put(AuthActions.authSignInSuccess());
  } catch (err) {
    yield put(AuthActions.authSignInFailure(err));
  }
}

export function* signout() {
  try {
    yield call(fetchFirebaseAuthSignOut);
    yield put(AuthActions.authSignOutSuccess());
  } catch (err) {
    yield put(AuthActions.authSignOutFailure(err));
  }
}

export function* confirmSignIn() {
  const user = yield call(fetchFirebaseAuthConfirmSignIn);
  yield put(AuthActions.authConfirmSignInSuccess(!!user));
}

const auth = (state: Auth = { isSignIn: false }, action: any) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_SIGNIN_SUCCESS:
    case AuthActionTypes.AUTH_SIGNOUT_SUCCESS:
    case AuthActionTypes.AUTH_CONFIRM_SIGNIN_SUCCESS:
      return { ...state, isSignIn: action.isSignIn };
    case AuthActionTypes.AUTH_SIGNIN_FAILURE:
    case AuthActionTypes.AUTH_SIGNOUT_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default auth;

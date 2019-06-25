import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Button from "../../modules/Button/Button";
import TextField from "../../modules/TextField/TextField";
import { firebaseAuth } from "../../utils/firebase";
import { authActions } from "../../store/auth";
import "./SignIn.css";
import { RootState } from "../../store";

const SignIn = () => {
  const isSignIn = useSelector((state: RootState) => state.auth.isSignIn);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(authActions.fetchSignInSuccess());
      }
    });
  });

  const signIn = useCallback(async () => {
    dispatch(authActions.fetchSignInRequest());
    try {
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      dispatch(authActions.fetchSignInSuccess());
    } catch (error) {
      dispatch(authActions.fetchSignInFailuer(error));
    }
  }, [email, password]);

  return isSignIn ? (
    <Redirect to="/" />
  ) : (
    <div className="SignIn">
      <TextField
        className="SignIn-Email"
        type="email"
        placeholder="E-mail"
        autoComplete="email"
        defaultValue={email}
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <TextField
        className="SignIn-Password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        defaultValue={password}
        onChange={e => setPassword(e.currentTarget.value)}
      />
      <Button className="SignIn-Button" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;

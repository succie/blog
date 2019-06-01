import React, { useState } from "react";
import { connect } from "react-redux";
import { AuthActions } from "../../store/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SignIn.css";

const mapDispatchToProps = (dispatch: any) => {
  return {
    authSignIn: (email: string, password: string) =>
      dispatch(AuthActions.authSignInRequest(email, password))
  };
};

type Props = ReturnType<typeof mapDispatchToProps>;

const SignIn = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = () => {
    props.authSignIn(email, password);
  };

  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <div className="SignIn-Forms">
        <TextField
          label="E-mail"
          className="SignIn-Forms-email"
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.currentTarget.value);
          }}
        />
        <TextField
          label="Password"
          className="SignIn-Forms-password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.currentTarget.value);
          }}
        />
      </div>
      <Button className="SignIn-Button" variant="contained" onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);

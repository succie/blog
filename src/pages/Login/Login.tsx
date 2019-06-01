import React, { useState } from "react";
import { connect } from "react-redux";
import { AuthActions } from "../../store/auth";

const mapDispatchToProps = (dispatch: any) => {
  return {
    authSignin: (email: string, password: string) => dispatch(AuthActions.authSigninRequest(email, password))
  };
};

type Props = ReturnType<typeof mapDispatchToProps>;

const Login = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    props.authSignin(email, password);
  };

  return (
    <div className="Login">
      <div className="Login-forms">
        <input
          type="email"
          defaultValue={email}
          onChange={e => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          defaultValue={password}
          onChange={e => {
            setPassword(e.currentTarget.value);
          }}
        />
      </div>
      <button onClick={login}>LOGIN</button>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Login);

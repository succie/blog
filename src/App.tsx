import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Page from "./pages";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import { RootState } from "./store";
import { articlesAction } from "./store/articles";
import { AuthActions } from "./store/auth";
import "./App.css";

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menu
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getArticles: () => dispatch(articlesAction.getArticlesRequest()),
    confirmUser: () => dispatch(AuthActions.authConfirmSignInRequest())
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.getArticles();
    this.props.confirmUser();
  }

  render() {
    const cns = classnames("Page", { "is-open-menu": this.props.menu.isOpen });
    return (
      <div className="App">
        <Header />
        <Menu />
        <Page />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import "./Menu.css";

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menu
  };
};

type Props = ReturnType<typeof mapStateToProps>;

const Menu = (props: Props) => {
  return props.menu.isOpen ? (
    <div className="Menu">
      <h1>menu</h1>
      <Link to="/admin">ADMIN PAGE</Link>
    </div>
  ) : null;
};

export default connect(mapStateToProps)(Menu);

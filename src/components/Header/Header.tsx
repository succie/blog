import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { menuActions } from "../../store/menu";
import { RootState } from "../../store";
import "./Header.css";

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menu
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openMenu: () => dispatch(menuActions.openMenu()),
    closeMenu: () => dispatch(menuActions.closeMenu())
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Header = (props: Props) => {
  const cns = classnames("Header", { "menu-is-open": props.menu.isOpen });
  return (
    <div className={cns}>
      <div className="Header-menu">
        <button onClick={props.menu.isOpen ? props.closeMenu : props.openMenu}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      </div>
      <Link to="/" className="Header-title">
        Succie's blog
      </Link>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

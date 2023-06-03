import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./nav.styles.scss";

const Nav = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop Now
          </Link>
          <Link className="nav-link" to="/auth">
            Sign In
          </Link>
          <Link className="nav-link" to="">
            link 3
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Nav;

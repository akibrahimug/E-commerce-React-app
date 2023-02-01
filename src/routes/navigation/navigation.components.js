import { Link, Outlet } from "react-router-dom";
import React, { Fragment, useContext } from "react";
import { ReactComponent as Ecommercelogo } from "../../assests/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartDropdownContext } from "../../components/context/cart-dropdown.context";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { toggleCart } = useContext(CartDropdownContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Ecommercelogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* if currentUser exsits  */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/signin">
              SIGNIN
            </Link>
          )}
          <CartIcon />
        </div>
        {toggleCart && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

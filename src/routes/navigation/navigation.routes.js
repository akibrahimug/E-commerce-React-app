import { Outlet } from "react-router-dom";
import React, { Fragment, useContext } from "react";
import { ReactComponent as Ecommercelogo } from "../../assests/crown.svg";
import {
  NavigationContainer,
  LogoStyles,
  Navlink,
  NavLinks,
} from "./navigation.styles";
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
      <NavigationContainer>
        <LogoStyles to="/">
          <Ecommercelogo />
        </LogoStyles>
        <NavLinks>
          <Navlink to="/shop">SHOP</Navlink>
          {/* if currentUser exsits  */}
          {currentUser ? (
            <Navlink as="span" onClick={signOutUser}>
              SIGN OUT
            </Navlink>
          ) : (
            <Navlink to="/signin">SIGNIN</Navlink>
          )}
          <CartIcon />
        </NavLinks>
        {toggleCart && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

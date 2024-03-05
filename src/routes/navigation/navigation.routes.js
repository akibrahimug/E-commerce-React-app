import { Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import { ReactComponent as Ecommercelogo } from "../../assests/crown.svg";
import {
  NavigationContainer,
  LogoStyles,
  Navlink,
  NavLinks,
} from "./navigation.styles";
// import { UserContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartDropdownContext } from "../../components/context/cart-dropdown.context";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  // const currentUser = useSelector((state) => state.user.currentUser);
  const currentUser = useSelector(selectCurrentUser);
  const toggleCart = useSelector(selectIsCartOpen);
  // const { toggleCart } = useContext(CartDropdownContext);

  // const lastName = currentUser?.displayName.split(" ")[1];
  // const upperCaseFirstLetter = `${lastName
  //   ?.split("")[0]
  //   ?.toUpperCase()}${lastName?.split("")?.splice(1)?.join("")}`;
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
              {/* Hi {upperCaseFirstLetter} */}
              SIGNOUT
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

import {
  ShoppingIconStyles,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles";
import { useContext } from "react";

import { CartDropdownContext } from "../context/cart-dropdown.context";
function CartIcon() {
  const { setToggleCart, toggleCart, cartCount } =
    useContext(CartDropdownContext);
  // show and hide cart-dropdown
  const handleClick = () => setToggleCart(!toggleCart);
  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingIconStyles className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;

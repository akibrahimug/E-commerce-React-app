import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";
// import React, { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
// import { CartDropdownContext } from "../context/cart-dropdown.context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
function CartDropdown() {
  const dispatch = useDispatch();
  // const { cartItems, setToggleCart } = useContext(CartDropdownContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
  };
  const cartItems = useSelector(selectCartItems);
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage> Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleClick}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;

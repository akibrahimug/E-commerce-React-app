import { CheckoutItemContainer } from "./checkoutItem.styles";
// import React, { useContext } from "react";
// import { CartDropdownContext } from "../context/cart-dropdown.context";
import {
  addItemToCart,
  removeCartItem,
  removeWithoutDecrement,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
function CheckoutItem({ cartItem }) {
  const dispatch = useDispatch();
  const { name, quantity, price, imageUrl } = cartItem;
  // const { addItemToCart, removeCartItem, removeWithoutDecrement } =
  //   useContext(CartDropdownContext);
  const cartItems = useSelector(selectCartItems);
  // handle addtocart
  const handleAddtoCart = () => dispatch(addItemToCart(cartItems, cartItem));

  // handle remove from cart
  const handleRemoveFromCart = () =>
    dispatch(removeCartItem(cartItems, cartItem));

  // handleClear cartItem
  const handleClearCartItem = () =>
    dispatch(removeWithoutDecrement(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        {" "}
        <span className="increase" onClick={handleAddtoCart}>
          &#10094;
        </span>
        {quantity}
        <span className="decrease" onClick={handleRemoveFromCart}>
          &#10095;
        </span>
      </span>

      <span className="price">£{price}</span>
      <div className="remove-button" onClick={handleClearCartItem}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;

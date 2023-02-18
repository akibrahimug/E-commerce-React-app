import { CheckoutItemContainer } from "./checkoutItem.styles";
import React, { useContext } from "react";
import { CartDropdownContext } from "../context/cart-dropdown.context";
function CheckoutItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;
  const { addItemToCart, removeCartItem, removeWithoutDecrement } =
    useContext(CartDropdownContext);

  // handle addtocart
  const handleAddtoCart = () => addItemToCart(cartItem);

  // handle remove from cart
  const handleRemoveFromCart = () => removeCartItem(cartItem);

  // handleClear cartItem
  const handleClearCartItem = () => removeWithoutDecrement(cartItem);

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

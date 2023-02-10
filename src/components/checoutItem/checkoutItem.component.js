import "./checkoutItem.styles.scss";
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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        {" "}
        <span onClick={handleAddtoCart} className="increase">
          &#10094;
        </span>
        {quantity}
        <span onClick={handleRemoveFromCart} className="decrease">
          &#10095;
        </span>
      </span>

      <span className="price">£{price}</span>
      <div className="remove-button" onClick={handleClearCartItem}>
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;

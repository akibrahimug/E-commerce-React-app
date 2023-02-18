import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import React from "react";

function CartItem({ cartItem }) {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="price">
          {quantity} X £{price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;

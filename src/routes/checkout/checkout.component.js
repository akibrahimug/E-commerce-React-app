import React, { useContext } from "react";
import { CartDropdownContext } from "../../components/context/cart-dropdown.context";
function Checkout() {
  const { cartItems } = useContext(CartDropdownContext);
  const removeItem = (e) => {
    cartItems.find((cartItem) =>
      cartItem.id === parseInt(e.target.id) ? console.log(cartItem) : ""
    );
  };
  return (
    <div>
      {cartItems?.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <span>{item.price}</span>
          <div>
            <span>+</span>
            <p>{item.quantity}</p>
            <span>-</span>
          </div>
          <button onClick={removeItem} id={item.id}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Checkout;

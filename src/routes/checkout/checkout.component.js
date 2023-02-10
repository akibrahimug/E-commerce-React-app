import React, { useContext } from "react";
import "./checkout.styles.scss";
import { CartDropdownContext } from "../../components/context/cart-dropdown.context";
import CheckoutItem from "../../components/checoutItem/checkoutItem.component";
function Checkout() {
  const { cartItems, checkoutTotalCost } = useContext(CartDropdownContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-blocks">
          <span>Product</span>
        </div>
        <div className="header-blocks">
          {" "}
          <span>Description</span>
        </div>
        <div className="header-blocks">
          {" "}
          <span>Quantity</span>
        </div>
        <div className="header-blocks">
          {" "}
          <span>Price</span>
        </div>
        <div className="header-blocks">
          {" "}
          <span>Remove</span>
        </div>
      </div>
      {cartItems?.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <span className="total">Total: £{checkoutTotalCost}</span>
    </div>
  );
}

export default Checkout;

import "./cart-dropdown.styles.scss";
import React, { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContext } from "../context/cart-dropdown.context";
import { useNavigate } from "react-router-dom";

function CartDropdown() {
  const { cartItems, setToggleCart } = useContext(CartDropdownContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/checkout");
    setToggleCart(false);
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={handleClick}>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;

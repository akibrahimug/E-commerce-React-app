// import React, { useContext } from "react";
import {
  CheckoutContainer,
  Header,
  HeaderBlocks,
  Total,
} from "./checkout.styles";
// import { CartDropdownContext } from "../../components/context/cart-dropdown.context";
import CheckoutItem from "../../components/checkoutItem/checkoutItem.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
function Checkout() {
  // const { cartItems, checkoutTotalCost } = useContext(CartDropdownContext);
  const cartItems = useSelector(selectCartItems);
  const checkoutTotalCost = useSelector(selectCartTotal);
  return (
    <CheckoutContainer>
      <Header>
        <HeaderBlocks>
          <span>Product</span>
        </HeaderBlocks>
        <HeaderBlocks>
          {" "}
          <span>Description</span>
        </HeaderBlocks>
        <HeaderBlocks>
          {" "}
          <span>Quantity</span>
        </HeaderBlocks>
        <HeaderBlocks>
          {" "}
          <span>Price</span>
        </HeaderBlocks>
        <HeaderBlocks>
          {" "}
          <span>Remove</span>
        </HeaderBlocks>
      </Header>
      {cartItems?.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Total>Total: £{checkoutTotalCost}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;

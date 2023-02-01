import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { CartDropdownContext } from "../context/cart-dropdown.context";
function CartIcon() {
  const { setToggleCart, toggleCart } = useContext(CartDropdownContext);
  // show and hide cart-dropdown
  const handleClick = () => setToggleCart(!toggleCart);
  return (
    <div className="cart-icon-container" onClick={handleClick}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
}

export default CartIcon;

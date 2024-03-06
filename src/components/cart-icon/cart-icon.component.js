import { ShoppingIconStyles, CartIconContainer, ItemCount } from './cart-icon.styles'
// import { useContext } from "react";

// import { CartDropdownContext } from "../context/cart-dropdown.context";
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
function CartIcon() {
  const dispatch = useDispatch()
  // const { setToggleCart, toggleCart, cartCount } =
  //   useContext(CartDropdownContext);
  // show and hide cart-dropdown
  const isCartOpen = useSelector(selectIsCartOpen)
  const handleClick = () => dispatch(setIsCartOpen(!isCartOpen))
  const cartCount = useSelector(selectCartCount)
  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingIconStyles className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon

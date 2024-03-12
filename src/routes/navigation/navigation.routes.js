import { Outlet } from 'react-router-dom'
import React, { Fragment } from 'react'
import { ReactComponent as Ecommercelogo } from '../../assests/crown.svg'
import { NavigationContainer, LogoStyles, Navlink, NavLinks } from './navigation.styles'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'
import { signOutStart } from '../../store/user/user.action'
const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const toggleCart = useSelector(selectIsCartOpen)
  const signOutUser = () => {
    dispatch(signOutStart())
  }
  return (
    <Fragment>
      <NavigationContainer>
        <LogoStyles to='/'>
          <Ecommercelogo />
        </LogoStyles>
        <NavLinks>
          <Navlink to='/shop'>SHOP</Navlink>
          {/* if currentUser exsits  */}
          {currentUser ? (
            <Navlink as='span' onClick={signOutUser}>
              {/* Hi {upperCaseFirstLetter} */}
              SIGNOUT
            </Navlink>
          ) : (
            <Navlink to='/signin'>SIGNIN</Navlink>
          )}
          <CartIcon />
        </NavLinks>
        {toggleCart && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation

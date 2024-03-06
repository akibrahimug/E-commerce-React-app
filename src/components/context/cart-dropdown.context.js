/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'
import { createAction } from '../../utils/reducer/reducer.utils'
// helper function to find in the cartItem array, if they the id of the "productToAdd" increment
// the quantity, if not add the item to the array
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const exsitingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  // if found, increment quantity
  if (exsitingCartItem) {
    return cartItems.map((cartItem) =>
      // if the id matches
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            // add to the quantity
            quantity: cartItem.quantity + 1,
            price: cartItem.price + cartItem.price,
          }
        : cartItem,
    )
  }
  // return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const exsitingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  // if the quanity is 1 remove the item
  if (exsitingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  } else {
    return cartItems.map((cartItem) =>
      // if the id matches
      cartItem.id === cartItemToRemove.id
        ? {
            ...cartItem,
            // add to the quantity
            quantity: cartItem.quantity - 1,
            price: cartItem.price / 2,
          }
        : cartItem,
    )
  }
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartDropdownContext = createContext({
  toggleCart: false,
  setToggleCart: () => {},
  // items added to the dropdown
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeCartItem: () => {},
  removeWithoutDecrement: () => {},
  checkoutTotalCost: 0,
})

const INITIAL_STATE = {
  toggleCart: false,
  cartItems: [],
  cartCount: 0,
  checkoutTotalCost: 0,
}

// store the case statements in a constant to avoid mistakes
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartDropdownReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        toggleCart: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartDropdownReducer`)
  }
}

export const CartDropdownProvider = ({ children }) => {
  // we can destructure the state within the useReducer
  const [{ cartCount, toggleCart, checkoutTotalCost, cartItems }, dispatch] = useReducer(
    cartDropdownReducer,
    INITIAL_STATE,
  )
  // or we can leave it and spread it outside
  // const [state, dispatch] = useReducer()
  // const { cartCount, toggleCart, checkoutTotalCost, cartItems } = state

  const updateCartDropdownReducer = (cartItems) => {
    const newCartCount = cartItems.reduce((a, b) => a + b.quantity, 0)
    const newTotalCount = cartItems.reduce((a, b) => a + b.price, 0)

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartCount: newCartCount,
        checkoutTotalCost: newTotalCount,
        cartItems: cartItems,
      }),
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartDropdownReducer(newCartItems)
  }

  const removeCartItem = (cartItemToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, cartItemToRemove)
    updateCartDropdownReducer(newCartItems)
  }

  const removeWithoutDecrement = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartDropdownReducer(newCartItems)
  }

  // handle toggle
  const setToggleCart = (boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))
  }

  const value = {
    toggleCart,
    setToggleCart,
    addItemToCart,
    cartItems,
    cartCount,
    removeCartItem,
    removeWithoutDecrement,
    checkoutTotalCost,
  }
  return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}

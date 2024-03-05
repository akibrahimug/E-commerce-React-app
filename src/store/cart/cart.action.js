import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.types";

// helper funtions
const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const exsitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // if the quanity is 1 remove the item
  if (exsitingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      // if the id matches
      cartItem.id === cartItemToRemove.id
        ? {
            ...cartItem,
            // add to the quantity
            quantity: cartItem.quantity - 1,
          }
        : cartItem
    );
  }
};

// helper function to find in the cartItem array, if they the id of the "productToAdd" increment
// the quantity, if not add the item to the array
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const exsitingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity
  if (exsitingCartItem) {
    return cartItems.map((cartItem) =>
      // if the id matches
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            // add to the quantity
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }
  // return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeWithoutDecrement = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

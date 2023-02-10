import { createContext, useEffect, useState } from "react";
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
            price: cartItem.price + cartItem.price,
          }
        : cartItem
    );
  }
  // return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

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
            price: cartItem.price / 2,
          }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

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
});
export const CartDropdownProvider = ({ children }) => {
  const [toggleCart, setToggleCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutTotalCost, setCheckOutTotalCost] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((a, b) => a + b.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalCount = cartItems.reduce((a, b) => a + b.price, 0);
    setCheckOutTotalCost(newTotalCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeCartItem = (cartItemToRemove) => {
    setCartItems(removeItemFromCart(cartItems, cartItemToRemove));
  };

  const removeWithoutDecrement = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    toggleCart,
    setToggleCart,
    addItemToCart,
    cartItems,
    cartCount,
    removeCartItem,
    removeWithoutDecrement,
    checkoutTotalCost,
  };
  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};

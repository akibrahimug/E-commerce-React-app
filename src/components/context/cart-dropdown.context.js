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
          }
        : cartItem
    );
  }
  // return new array with modified cartItem/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartDropdownContext = createContext({
  toggleCart: false,
  setToggleCart: () => {},
  // items added to the dropdown
  cartItems: [],
  addItemTOCart: () => {},
  cartCount: 0,
});
export const CartDropdownProvider = ({ children }) => {
  const [toggleCart, setToggleCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCont] = useState(0);
  useEffect(() => {
    const newCartCount = cartItems.reduce((a, b) => a + b.quantity, 0);
    setCartCont(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    toggleCart,
    setToggleCart,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};

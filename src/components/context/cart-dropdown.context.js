import { createContext, useState } from "react";

export const CartDropdownContext = createContext({
  toggleCart: false,
  setToggleCart: () => {},
});
export const CartDropdownProvider = ({ children }) => {
  const [toggleCart, setToggleCart] = useState(false);
  const value = {
    toggleCart,
    setToggleCart,
  };
  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};

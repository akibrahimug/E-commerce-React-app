import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
// this user context manages the entire user authentication
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
// this provides the data needed
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // the onAuthStateChanged from firebase handles all the authentication
  // and listens to any changes from the components and changes accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // to prevent memory leak, we close the listener when nothing is changing
    // clean up phase
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

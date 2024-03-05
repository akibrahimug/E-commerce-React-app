import Home from "./routes/home/home.routes";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.routes";
import Authentication from "./routes/authenticate/auth.routes";
import Shop from "./routes/shop/shop.routes";
import Checkout from "./routes/checkout/checkout.routes";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  // the onAuthStateChanged from firebase handles all the authentication
  // and listens to any changes from the components and changes accordingly
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    // to prevent memory leak, we close the listener when nothing is changing
    // clean up phase
    return unsubscribe;
    // this dispatch never reruns but useEffect complians
  }, [dispatch]);

  // Cart

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* shop is an outlet of the home page/ or a nested route /shop */}
        {/* index tells the route to match the route / and render the component as well */}
        <Route index element={<Home />} />
        <Route path="signin" element={<Authentication />} />
        {/* star for anything that comes after shop */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

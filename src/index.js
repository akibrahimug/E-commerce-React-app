import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// import { UserProvider } from "./components/context/user.context";
// import { CategoriesProvider } from "./components/context/categories.context";
// import { CartDropdownProvider } from "./components/context/cart-dropdown.context";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* we need to create a loading component */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartDropdownProvider> */}
          <App />
          {/* </CartDropdownProvider> */}
          {/* </CategoriesProvider> */}
          {/* </UserProvider> */}
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

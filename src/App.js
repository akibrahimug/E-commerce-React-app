import Home from "./routes/home/home.routes";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.routes";
import Authentication from "./routes/authenticate/auth.routes";
import Shop from "./routes/shop/shop.routes";
import Checkout from "./routes/checkout/checkout.routes";
const App = () => {
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

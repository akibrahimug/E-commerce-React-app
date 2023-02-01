import "./styles/categories.styles.scss";
import Home from "./routes/home/home.components";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.components";
import Authentication from "./routes/authenticate/auth.component";
import Shop from "./routes/shop/shop.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* shop is an outlet of the home page/ or a nested route /shop */}
        {/* index tells the route to match the route / and render the component as well */}
        <Route index element={<Home />} />
        <Route path="signin" element={<Authentication />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;

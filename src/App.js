import "./styles/categories.styles.scss";
import Home from "./components/routes/home/home.components";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/routes/navigation/navigation.components";
import Signin from "./components/routes/signin/sign-in.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* shop is an outlet of the home page/ or a nested route /shop */}
        {/* index tells the route to match the route / and render the component as well */}
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
};

export default App;

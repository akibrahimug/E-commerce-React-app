import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.routes";
import Category from "../category/category.routes";
import { Products } from "./shop.styles";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

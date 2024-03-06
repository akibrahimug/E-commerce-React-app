import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.routes";
import Category from "../category/category.routes";
// import { Products } from "./shop.styles";
import { fetchCategoriesAsync } from "../../store/categories/category.action.js";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
const Shop = () => {
  const dispatch = useDispatch();
  // getting the data from firestore
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

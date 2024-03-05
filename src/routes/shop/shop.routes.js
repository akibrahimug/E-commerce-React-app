import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.routes";
import Category from "../category/category.routes";
// import { Products } from "./shop.styles";
import { setCategories } from "../../store/categories/category.action.js";
import { useDispatch } from "react-redux";
import {
  // addCollectionAndDocument,
  getCategoriesAndDocument,
} from "../../utils/firebase/firebase.utils.js";
import React, { useEffect } from "react";
const Shop = () => {
  const dispatch = useDispatch();
  // getting the data from firestore
  useEffect(() => {
    const getCategoriesArray = async () => {
      const categoriesArray = await getCategoriesAndDocument();
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesArray();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

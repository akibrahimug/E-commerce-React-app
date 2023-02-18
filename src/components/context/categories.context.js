import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../../shop-data.js";
import {
  // addCollectionAndDocument,
  getCategoriesAndDocument,
} from "../../utils/firebase/firebase.utils.js";
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // Storing the data.js files into the firestore
  // useEffect(() => {
  //   addCollectionAndDocument("categories", SHOP_DATA);
  // }, []);

  // getting the data from firestore
  useEffect(() => {
    const getData = async () => {
      const data = await getCategoriesAndDocument();
      setCategoriesMap(data);
    };
    getData();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

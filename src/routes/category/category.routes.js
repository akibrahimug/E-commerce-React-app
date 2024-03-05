import { CategoryContainer, Title } from "./category.styles";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { CategoriesContext } from "../../components/context/categories.context";
import ProductCart from "../../components/productCart/productCart.components";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
function Category() {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);
  return (
    <>
      <Title>{category.toLocaleUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
}

export default Category;

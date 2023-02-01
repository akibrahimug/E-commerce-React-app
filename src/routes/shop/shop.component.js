import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../components/context/products.context";
import ProductCart from "../../components/productCart.js/productCart";
import "./shop.styles.scss";
const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((item) => (
        <ProductCart key={item.id} product={item} />
      ))}
    </div>
  );
};

export default Shop;

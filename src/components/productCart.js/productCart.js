import Button from "../button/button.component";
import "./productCart.styles.scss";
import { useContext } from "react";
import { CartDropdownContext } from "../context/cart-dropdown.context";
function ProductCart({ product }) {
  const { addItemToCart } = useContext(CartDropdownContext);
  const { name, price, imageUrl } = product;
  // its better to define it here rather than in the button for optimization
  const addToCart = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
}

export default ProductCart;

import {
  ProductCartContainer,
  Image,
  Footer,
  Name,
  Price,
  BaseButton,
} from "./productCart.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext } from "react";
import { CartDropdownContext } from "../context/cart-dropdown.context";
function ProductCart({ product }) {
  const { addItemToCart } = useContext(CartDropdownContext);
  const { name, price, imageUrl } = product;
  // its better to define it here rather than in the button for optimization
  const addToCart = () => addItemToCart(product);
  return (
    <ProductCartContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>£{price}</Price>
      </Footer>
      <BaseButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>
        Add to cart
      </BaseButton>
    </ProductCartContainer>
  );
}

export default ProductCart;

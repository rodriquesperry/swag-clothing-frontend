import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/Button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.types';

import { CartItem } from '../../routes/checkout/Checkout';

import './product_card.styles.scss';

export type ProductProps = {
  product: CartItem,
}

const ProductCard = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const { imageUrl, name, price } = product;
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => addItemToCart(cartItems, product, dispatch);

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='card-footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
		</div>
	);
};

export default ProductCard;

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/Button.component';

import './product_card.styles.scss';

const ProductCard = ({ product }) => {
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
      <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
		</div>
	);
};

export default ProductCard;

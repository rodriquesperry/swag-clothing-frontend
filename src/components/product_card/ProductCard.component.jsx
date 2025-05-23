import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/Button.component';

import './product_card.styles.scss';

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

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

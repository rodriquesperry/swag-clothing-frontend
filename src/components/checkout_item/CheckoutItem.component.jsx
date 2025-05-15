import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { HiMiniMinusSmall } from 'react-icons/hi2';
import { HiMiniPlusSmall } from 'react-icons/hi2';

import './checkout_item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { clearItemFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);

	const clearCartItem = () => clearItemFromCart(cartItem);
  const removeCartItem = () => removeItemFromCart(cartItem);
  const incrementCartItem = () => addItemToCart(cartItem);

	return (
		<div className='checkout-item-container'>
			<img src={imageUrl} alt={name} />
			<span className='name'>{name}</span>
			<span className='quantity item-info'>
				<HiMiniMinusSmall onClick={removeCartItem} />
				{quantity}
				<HiMiniPlusSmall onClick={incrementCartItem} />
			</span>
			<span className='price item-info'>${quantity * price}</span>
			<span className='item-info delete' onClick={clearCartItem}>
				x
			</span>
		</div>
	);
};

export default CheckoutItem;

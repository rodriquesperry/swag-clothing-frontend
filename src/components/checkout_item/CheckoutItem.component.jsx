import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { HiMiniMinusSmall } from 'react-icons/hi2';
import { HiMiniPlusSmall } from 'react-icons/hi2';

import './checkout_item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { clearItemFromCart, removeItemFromCart, addItemToCart } =
		useContext(CartContext);

	const handleClearCartItem = () => clearItemFromCart(cartItem);
	const handleRemoveCartItem = () => removeItemFromCart(cartItem);
	const handleIncrementCartItem = () => addItemToCart(cartItem);

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={name} />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity item-info'>
				<HiMiniMinusSmall onClick={handleRemoveCartItem} />
				{quantity}
				<HiMiniPlusSmall onClick={handleIncrementCartItem} />
			</span>
			<span className='price item-info'>${quantity * price}</span>
			<span className='item-info delete' onClick={handleClearCartItem}>
				&#10005;
			</span>
		</div>
	);
};

export default CheckoutItem;

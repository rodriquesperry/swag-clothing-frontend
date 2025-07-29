import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart, removeItemFromCart, addItemToCart } from '../../store/cart/cart.action';
import { HiMiniMinusSmall } from 'react-icons/hi2';
import { HiMiniPlusSmall } from 'react-icons/hi2';

import { CartItem } from '../../routes/checkout/Checkout';

import './checkout_item.styles.scss';

type CheckoutItemProps = {
  cartItem: CartItem;
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);  
	
  const { name, imageUrl, price, quantity } = cartItem;

	const handleClearCartItem = () => clearItemFromCart(cartItems, cartItem, dispatch);
	const handleRemoveCartItem = () => removeItemFromCart(cartItems, cartItem, dispatch);
	const handleIncrementCartItem = () => addItemToCart(cartItems, cartItem, dispatch);

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

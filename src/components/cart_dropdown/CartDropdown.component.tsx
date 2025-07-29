import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector.js';
// import type { CartItems } from '../../routes/checkout/Checkout.js';

import Button from '../button/Button.component.js';
import CartItem from '../cart_item/CartItem.component.js';

import './cart_dropdown.styles.scss';

// type CartItemProps = {
//   cartItem: CartItems;
// }

const CartDropdown = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

	const navigate = useNavigate();
	const redirectToCheckout = () => {
		dispatch(setIsCartOpen(!isCartOpen));
		navigate('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={redirectToCheckout}>Go To Checkout</Button>
		</div>
	);
};

export default CartDropdown;

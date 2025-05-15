import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/Button.component';
import CartItem from '../cart_item/CartItem.component';

import './cart_dropdown.styles.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	
  const navigate = useNavigate();
	const redirectToCheckout = () => {
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

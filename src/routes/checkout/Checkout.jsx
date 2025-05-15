import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout_item/CheckoutItem.component';

import './checkout.styles.scss';
const Checkout = () => {
	const { cartItems, total } = useContext(CartContext);

	return (
		<div className='checkout-container'>
			<div>
				<div className='checkout-header'>
					<p>Product</p>
					<p>Description</p>
					<p>Quantity</p>
					<p>Price</p>
					<p>Remove</p>
				</div>
				<hr />
				{cartItems.length > 0 ? (
					<div className='checkout-items'>
						{cartItems.map((item) => (
							<div key={item.id}>
								<CheckoutItem cartItem={item} />
								<hr />
							</div>
						))}
					</div>
				) : (
					<div className='empty-cart-message'>
						<h2>Your Cart is Empty.</h2>
					</div>
				)}
        <div className='total-price'>Total: ${total}</div>
			</div>
		</div>
	);
};

export default Checkout;

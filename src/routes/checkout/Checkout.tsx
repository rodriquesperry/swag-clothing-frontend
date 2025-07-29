import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout_item/CheckoutItem.component';
import PaymentForm from '../../components/payment_form/PaymentForm.component';


import './checkout.styles.scss';

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

	console.log('cartItems::', cartItems);
  
  
  return (
		<div className='checkout-container'>
			<div>
				<div className='checkout-header'>
					<p>Product</p>
					<p>Description</p>
					<p className='ml-adjust'>Quantity</p>
					<p className='ml-adjust'>Price</p>
					<p>Remove</p>
				</div>
				<hr />
				{cartItems.length > 0 ? (
					<div className='checkout-items'>
						{cartItems.map((item: CartItem) => (
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
        <PaymentForm  />
			</div>
		</div>
	);
};

export default Checkout;

import React from 'react';
import './cart_item.styles.scss';
import type { CartItem } from '../../routes/checkout/Checkout';

type CartItemProps = {
  cartItem: CartItem;
  
}

const CartItem = ({ cartItem }: CartItemProps) => {
	const { title, imageUrl, price, quantity } = cartItem;

	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={title} />
			<div className='item-details'>
				<span className='title'>{title}</span>
				<span className='price'>
					{quantity} x ${price}
				</span>
			</div>
		</div>
	);
};

export default CartItem;

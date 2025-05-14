import { useEffect, useState } from 'react';
import { CartContext } from '../contexts/cart.context';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// const itemCount = (cartItems) => {
		// 	let count = 1;
		// 	cartItems.map((item) => {
		// 		count += item.quantity;
		// 	});
		// 	return count;
		// };

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
    // Doing the same thing as itemCount() but only using reduce.
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
    // setCount(itemCount(cartItems))
	};

	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, count };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

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

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(item) => item.id === productToRemove.id
	);

	if (existingCartItem.quantity === 1) {
		return clearCartItem(cartItems, productToRemove);
	}

	return cartItems.map((item) =>
		item.id === productToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};

const clearCartItem = (cartItems, productToRemove) => {
	return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [count, setCount] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		// Doing the same thing as itemCount() but only using reduce method.
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCount(newCartCount);
	}, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);
		setTotal(newTotal);
  }, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
		// setCount(itemCount(cartItems))
	};

  const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
		// setCount(itemCount(cartItems))
	};

	const clearItemFromCart = (productToRemove) => {
		setCartItems(clearCartItem(cartItems, productToRemove));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
    removeItemFromCart,
		clearItemFromCart,
		cartItems,
		count,
		total,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// const itemCount = (cartItems) => {
// 	let count = 1;
// 	cartItems.map((item) => {
// 		count += item.quantity;
// 	});
// 	return count;
// };

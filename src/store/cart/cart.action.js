import { createAction } from '../../utils/reducers/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export const setCartItems = (newCartItems, newCartCount, newTotal) =>
	createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
		cartItems: newCartItems,
		total: newTotal,
		count: newCartCount,
	});

export const setIsCartOpen = (isCartOpen) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd, dispatch) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	dispatchCartUpdate(newCartItems, dispatch);
};

export const removeItemFromCart = (cartItems, productToRemove, dispatch) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	dispatchCartUpdate(newCartItems, dispatch);
};

export const clearItemFromCart = (cartItems, productToRemove, dispatch) => {
	const newCartItems = clearCartItem(cartItems, productToRemove);
	dispatchCartUpdate(newCartItems, dispatch);
};

const isExistingCartItem = (cartItems, itemToCompare) => {
	return cartItems.find((item) => item.id === itemToCompare.id);
};

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = isExistingCartItem(cartItems, productToAdd);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, productToClear) => {
	return cartItems.filter((item) => item.id !== productToClear.id);
};

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = isExistingCartItem(cartItems, productToRemove);

	if (existingCartItem.quantity === 1) {
		return clearCartItem(cartItems, productToRemove);
	}

	return cartItems.map((item) =>
		item.id === productToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};

const dispatchCartUpdate = (newCartItems, dispatch) => {
	const newCartCount = newCartItems.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0
	);

	const newTotal = newCartItems.reduce(
		(total, cartItem) => total + cartItem.price * cartItem.quantity,
		0
	);

	dispatch(
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
			cartItems: newCartItems,
			total: newTotal,
			count: newCartCount,
		})
	);
};

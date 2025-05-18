/** 
 * Use reducer if you have more than one thing to update in a state value or
 * if your team decides to use reducer instead of useState
 */

import { useReducer } from 'react';
import { createAction } from '../utils/reducers/reducer.utils';
import { CartContext, CART_ACTION_TYPES } from '../contexts/cart.context';

const existingCartItem = (cartItems, itemToCompare) => {
	return cartItems.find((item) => item.id === itemToCompare.id);
};

const addCartItem = (cartItems, productToAdd) => {
	const CartItemExists = existingCartItem(cartItems, productToAdd);

	if (CartItemExists) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
	const CartItemExists = existingCartItem(cartItems, productToRemove);

	if (CartItemExists.quantity === 1) {
		return clearCartItem(cartItems, productToRemove);
	}

	return cartItems.map((item) =>
		item.id === productToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};

const clearCartItem = (cartItems, productToClear) => {
	return cartItems.filter((item) => item.id !== productToClear.id);
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	count: 0,
	total: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return { ...state, isCartOpen: payload };
      // Generic case that updates cartItems, total, and count all in one.
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, ...payload };
		default:
			throw new Error(`unhandled type of ${type} in the cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, count, total } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

    const newTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, total: newTotal, count: newCartCount } ));
  }

  /* Mutators */
  const setIsCartOpen = (isCartOpen) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
    console.log(isCartOpen);
    
	};

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

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

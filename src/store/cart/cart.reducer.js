import { CART_ACTION_TYPES } from './cart.types';

export const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	count: 0,
	total: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      console.log('payload::', payload);
			return { ...state, isCartOpen: payload };
		// Generic case that updates cartItems, total, and count all in one.
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, ...payload };

		case CART_ACTION_TYPES.ADD_CART_ITEM:
			return { ...state, quantity: state.quantity + 1 };

		case CART_ACTION_TYPES.REMOVE_CART_ITEM:
			return { ...state, quantity: state.quantity - 1 };
		
      case CART_ACTION_TYPES.CLEAR_CART_ITEMS:
			return { ...state, quantity: state.quantity - 1 };

		default:
      return state;
  }
};

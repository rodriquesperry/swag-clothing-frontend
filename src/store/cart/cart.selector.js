import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => {
	return cart.cartItems;
});

export const selectCartTotal = createSelector([selectCartReducer], (cart) => {
	return cart.total;
});

export const selectCartCount = createSelector([selectCartReducer], (cart) => {
	return cart.count;
});

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
	return cart.isCartOpen;
});

export const selectAddCartItem = createSelector([selectCartReducer], (cart) => {
  return cart.quantity;
})

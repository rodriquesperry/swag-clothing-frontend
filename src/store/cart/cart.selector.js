import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector([selectCartReducer], (cart) => {
	console.log('fired 1');

	return cart.cartItems;
});

export const selectCartTotal = createSelector([selectCartReducer], (cart) => {
	console.log('fired 3');
	return cart.total;
});

export const selectCartCount = createSelector([selectCartReducer], (cart) => {
	console.log('fired 2');
	return cart.count;
});

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
	console.log('fired 4');
	return cart.isCartOpen;
});

export const selectAddCartItem = createSelector([selectCartReducer], (cart) => {
  console.log('fired selectAddCartItem');
  return cart.quantity;
})

export const selectClearCartItem = createSelector([selectCartReducer], (cart) => {
  console.log('fired selectClearCartItem');
  
})
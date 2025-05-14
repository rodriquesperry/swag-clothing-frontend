import { createContext } from 'react';

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
  count: 0,
});


// Not setting setCartItems in this file is a sign of encapsulation. It prevents anyone from
// directly changing the state that has access to the context. We declare & consume it in the 
// provider file. The way it is set up ensures that the state can only be changed in controlled ways. 
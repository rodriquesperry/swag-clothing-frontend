import { useState } from "react";
import { ProductsContext } from "../contexts/products.context";
import PRODUCTS from '../shop_data/shop_data.json';


export const ProductsProvider = ({ children }) => {
	const [products] = useState(PRODUCTS);
	const value = { products };

	return (
		<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
	);
};
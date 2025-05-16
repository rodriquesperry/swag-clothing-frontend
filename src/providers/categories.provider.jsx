import { useState, useEffect } from 'react';
import { CategoriesContext } from '../contexts/categories.context.jsx';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap)
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};

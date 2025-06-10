import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { fetchCategoriesStart } from '../../store/categories/category.action';

import CategoriesPreview from '../categories_preview/CategoriesPreview';
import Category from '../../routes/category/Category';

import './shop.styles.scss';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;

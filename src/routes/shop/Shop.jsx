import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

import CategoriesPreview from '../../routes/categories_preview/CategoriesPreview';
import Category from '../../routes/category/Category';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments();
			console.log('catregoriesArray:: ', categoriesArray);
      dispatch(setCategories(categoriesArray));
		};
		getCategoriesMap();
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;

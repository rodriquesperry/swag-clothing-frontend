import { Routes, Route } from 'react-router';
import CategoriesPreview from '../../routes/categories_preview/CategoriesPreview';
import Category from '../../routes/category/Category';

import './shop.styles.scss';

const Shop = () => {

	return (
		<Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
	);
};

export default Shop;

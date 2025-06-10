import { useSelector } from 'react-redux';
import {
	selectCategoriesMap,
	selectIsCategoriesLoading,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category_preview/CategoryPreview.component';
import Spinner from '../../components/spinner/Spinner.component';

import './categories_preview.styles.scss';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsCategoriesLoading);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return (
						<CategoryPreview
							key={title}
							title={title}
							productsArray={products}
						/>
					);
				})
			)}
		</>
	);
};

export default CategoriesPreview;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
	selectCategoriesMap,
	selectIsCategoriesLoading,
} from '../../store/categories/category.selector';

import ProductCard from '../../components/product_card/ProductCard.component';
import Spinner from '../../components/spinner/Spinner.component';

import './category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsCategoriesLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		console.log('effect fired calling setProducts');
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='category-container'>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			)}
		</>
	);
};

export default Category;

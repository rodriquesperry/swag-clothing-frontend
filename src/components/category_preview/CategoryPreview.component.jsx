import { Link } from 'react-router';
import ProductCard from '../product_card/ProductCard.component';
import './category_preview.styles.scss';

const CategoryPreview = ({ title, productsArray }) => {
	return (
		<div className='category-preview-container'>
			<h2>
				<Link to={`/shop/${title.toLowerCase()}`} className='title'>
					<span>{title.toUpperCase()}</span>
				</Link>
			</h2>
			<div className='preview'>
				{productsArray
					.filter((_, i) => i < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;

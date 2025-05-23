import DirectoryItem from '../directory_item/DirectoryItem.component';
import './category_list.styles.scss';

const CategoryList = () => {
  const categories = [
		{
			id: 1,
			title: 'HATS',
			imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
		},
		{
			id: 2,
			title: 'JACKETS',
			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
		},
		{
			id: 3,
			title: 'SNEAKERS',
			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
		},
		{
			id: 4,
			title: 'WOMENS',
			imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
		},
		{
			id: 5,
			title: 'MENS',
			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
		},
	];

	return (
		<>
			<div className='categories-container'>
				{categories.map(({ title, id, imageUrl }) => (
					<DirectoryItem title={title} imageUrl={imageUrl} key={id} />
				))}
			</div>
		</>
	);
}

export default CategoryList
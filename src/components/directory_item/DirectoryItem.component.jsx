import { useNavigate } from 'react-router';
import './directory_item.styles.scss';


const DirectoryItem = ({ imageUrl, title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop/${title.toLowerCase()}`);
  }

	return (
		<>
			<div onClick={handleClick} className='directory-item-container'>
				<div
					className='background-image'
					style={{ backgroundImage: `url(${imageUrl})` }}
				></div>
				<div className='directory-body-container'>
					<h2>{title}</h2>
					<p>Shop Now</p>
				</div>
			</div>
		</>
	);
};

export default DirectoryItem;

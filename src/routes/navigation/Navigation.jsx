import { Outlet, Link } from 'react-router';
import { useDispatch ,useSelector } from 'react-redux';

import CartIcon from '../../components/cart_icon/CartIcon.component.jsx';
import CartDropdown from '../../components/cart_dropdown/CartDropdown.component.jsx';

// import { CartContext } from '../../contexts/cart.context.jsx';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import { signOutUser } from '../../utils/firebase/firebase.utils.js';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

import CrwnLogo from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const currentUser = useSelector(selectCurrentUser);

	const toggleCart = () => {
		dispatch(setIsCartOpen(!isCartOpen));
	};


  console.log('isCartOpen:: ', isCartOpen);
  

	return (
		<>
			<nav>
				<Link className='nav-link logo' to='/'>
					<img src={CrwnLogo} alt='Swag clothing logo.' className='logo-svg' />
				</Link>
				<ul>
					<li>
						{' '}
						<Link className='nav-link' to='/shop'>
							Shop
						</Link>
					</li>
					<li>
						{' '}
						<Link className='nav-link' to='/contact'>
							Contact
						</Link>
					</li>
					<li>
						{currentUser ? (
							<Link className='nav-link'>
								<span className='nav-link' onClick={signOutUser}>
									Sign Out
								</span>
							</Link>
						) : (
							<Link className='nav-link' to='/auth'>
								Sign In
							</Link>
						)}
					</li>
					<CartIcon onClick={toggleCart} />
				</ul>
				{isCartOpen && <CartDropdown />}
			</nav>
			<Outlet />
		</>
	);
};

export default Navigation;

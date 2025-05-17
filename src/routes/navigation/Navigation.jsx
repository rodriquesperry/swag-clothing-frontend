import { useContext } from 'react';
import { Outlet, Link } from 'react-router';

import CartIcon from '../../components/cart_icon/CartIcon.component.jsx';
import CartDropdown from '../../components/cart_dropdown/CartDropdown.component.jsx';

import { signOutUser } from '../../utils/firebase/firebase.utils.js';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context.jsx';

import CrwnLogo from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

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
					<CartIcon onClick={toggleCart}/>
				</ul>
        {isCartOpen && <CartDropdown />}
        
			</nav>
			<Outlet />
		</>
	);
};

export default Navigation;

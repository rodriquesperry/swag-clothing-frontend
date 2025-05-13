import { useContext } from 'react';
import { Outlet, Link } from 'react-router';

import { signOutUser } from '../../utils/firebase/firebase.utils.js'

import CrwnLogo from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

import './navigation.styles.scss';

const Navigation = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);

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
								<span className='nav-link' onClick={signOutUser}>Sign Out</span>
							</Link>
						) : (
							<Link className='nav-link' to='/auth'>
								Sign In
							</Link>
						)}
					</li>
					<li>
						{' '}
						<Link className='nav-link' to='/'>
							Count
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
};

export default Navigation;

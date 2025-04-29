import { Outlet, Link } from 'react-router';
import CrwnLogo  from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
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
						{' '}
						<Link className='nav-link' to='/sign-in'>
							Sign In
						</Link>
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

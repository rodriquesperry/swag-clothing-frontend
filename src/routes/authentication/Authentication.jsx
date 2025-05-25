import SigninForm from '../../components/signInForm/SigninForm.component';
import SignupForm from '../../components/signupForm/SignupForm.component';

import './authentication.styles.scss';

const Authentication = () => {
	return (
		<div className='authentication-container'>
			<SigninForm />
      <SignupForm />
		</div>
	);
};

export default Authentication;

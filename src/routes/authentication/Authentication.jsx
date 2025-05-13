import { useEffect, useState } from 'react';
import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import SigninForm from '../../components/signInForm/SigninForm.component';
import SignupForm from '../../components/signupForm/SignupForm.component';
import Button from '../../components/button/Button.component';

import './authentication.styles.scss';

const Authentication = () => {
	const [redirectUser, setRedirectUser] = useState(null);

	useEffect(() => {
		// Fallback for already-signed-in user
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				await createUserDocumentFromAuth(user);
				setRedirectUser(user);
			} else {
				console.log('No user authenticated.');
			}
		});

    

		return unsubscribe;
	}, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
		setRedirectUser(user);
	};

  const logOutUser = async () => {
    await signOut(auth);
    setRedirectUser(null);
    console.log('User signed out.');
    
  }

	return (
		<div className='authentication-container'>
			<SigninForm onClick={logGoogleUser} />
      <SignupForm  />
		</div>
	);
};

export default Authentication;

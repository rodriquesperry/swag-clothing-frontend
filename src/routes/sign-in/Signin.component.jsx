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

import './sign-in.styles.scss';

const Signin = () => {
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
		<div className='sign-in-container'>
    {redirectUser ? (
        <>
          <p style={{ color: 'green' }}>Signed in as: {redirectUser.displayName}</p>
          <Button onClick={logOutUser} text='Sign Out' />
        </>
      ) : (
        <>
          <p style={{ color: 'red' }}>Not signed in</p>
        </>
      )}
			<SigninForm onClick={logGoogleUser} />
      <SignupForm  />
		</div>
	);
};

export default Signin;

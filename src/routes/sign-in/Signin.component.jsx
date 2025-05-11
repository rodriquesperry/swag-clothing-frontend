import { useEffect, useState } from 'react';
import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import SignupForm from '../../components/signup/SignupForm.component';

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
		<>
			<h1>Signin</h1>
			{redirectUser ? (
        <>
          <p style={{ color: 'green' }}>Signed in as: {redirectUser.displayName}</p>
          <button onClick={logOutUser}>Sign Out</button>
        </>
      ) : (
        <>
          <p style={{ color: 'red' }}>Not signed in</p>
          <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </>
      )}
      <SignupForm  />
		</>
	);
};

export default Signin;

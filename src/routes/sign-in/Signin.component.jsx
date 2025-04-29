import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const Signin = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<>
			<h1>Signin</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</>
	);
};

export default Signin;

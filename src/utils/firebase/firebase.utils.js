import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
  browserPopupRedirectResolver,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Update createAuthUserWithEmailAndPassword function
import { updateProfile } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCaujoOOXtNhMAN-NrSPeKKaEbEXP4I9_w',
	authDomain: 'swag-clothing.firebaseapp.com',
	projectId: 'swag-clothing',
	storageBucket: 'swag-clothing.firebasestorage.app',
	messagingSenderId: '11489504917',
	appId: '1:11489504917:web:ebca976550f10039acb59c',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();
auth._popupRedirectResolver = browserPopupRedirectResolver;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	// First check if data exists
	// if user data does not exist
	// create / set the document with the data from userAuth in my collection

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(
				userDocRef,
				{
					displayName,
					email,
					createdAt,
				},
				{ merge: true }
			);
		} catch (error) {
			console.log('Error creating the user:: ', error.message);
		}
	} else {
		console.log('User already exists in Firestore:', userAuth.displayName);
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
	email,
	password,
	displayName
) => {
	if (!email || !password) return;

	const { user } = await createUserWithEmailAndPassword(auth, email, password);

	await updateProfile(user, {
		displayName: displayName,
	});

	user.displayName = displayName;

	await createUserDocumentFromAuth({ ...user, displayName });

	return user;
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);	
};

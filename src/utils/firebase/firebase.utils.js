import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	documentObjectsToAdd
) => {
	// How do we actually create the documents?
	// This creates the collection reference to the db that we pass into the function as collectionKey.
	const collectionRef = collection(db, collectionKey);
	// We need to figure out how to store the documentObjectsToAdd in the db under each collectionKey.
	const batch = writeBatch(db);

	documentObjectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('Batch Done!!!');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	// Generate the query off of the collectionRef
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, additionalDetails = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);
	// First check if data exists
	// if user data does not exist
	// create / set the document with the data from userAuth in my collection

  console.log('additionalDetails::', additionalDetails);
  
  
  const displayName = additionalDetails.displayName || userAuth.displayName;
  
	if (!userSnapshot.exists()) {
    const { email } = userAuth;
		const createdAt = new Date();
    
    console.log('additionalDetails.displayName::', additionalDetails.displayName);
    if (!displayName) {
			throw new Error('Missing displayName. Cannot create document with undefined value.');
		}

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
			console.log('Error creating the user: ', error.message);
		}
	} else {
		console.log('User already exists in Firestore:', userAuth.displayName);
	}
	return userSnapshot;
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
	return { user };
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	return userCredential;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};

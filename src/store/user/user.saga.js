import { takeLatest, put, all, call } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	signUpSuccess,
} from './user.action';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
	try {
		console.log('additionalDetails::', additionalDetails); // 4

		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);

		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password,
			displayName
		);
		yield put(signUpSuccess({ user, additionalDetails: { displayName } }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSgagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}

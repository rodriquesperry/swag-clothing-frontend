import { useEffect, useReducer } from 'react';
import { UserContext, USER_ACTION_TYPES } from '../contexts/user.context';
import { createAction } from '../utils/reducers/reducer.utils';
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { 
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`unhandled type ${type} in the userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;
  

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe; // Correctly returns the cleanup function
	}, []);

	// This wraps around content that uses the context
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

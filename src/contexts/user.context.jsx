import { createContext } from 'react';

// This is the actual value that you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

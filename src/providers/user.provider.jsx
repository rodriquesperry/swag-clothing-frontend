import { useState, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	// Want to be able to call setCurrentUser and access its value (currentUser) anywhere
	// in the DOM tree that uses this Provider
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
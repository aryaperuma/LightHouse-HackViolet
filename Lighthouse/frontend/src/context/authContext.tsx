import React, { useState, useEffect } from "react";
import firebase from "../FirebaseConfig";

export const AuthContext = React.createContext({ currentUser: null });

const AuthContextProvider: React.FC<any> = (props: any) => {
	const [currentUser, setCurrentUser] = useState<any>(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(setCurrentUser);
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser: currentUser }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

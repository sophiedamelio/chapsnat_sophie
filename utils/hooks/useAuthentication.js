import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			console.log("HI I HAVE LOGGA IN YES");
			const userDataRef = doc(db, 'Users', user.uid);
			getDoc(userDataRef).then((snapshot) => {
			console.log("got user info? ----->", snapshot.data());
			setUserData({...snapshot.data()});

			//console.log(userData, "<-- user data")
			});

			setUser(user);

		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user, userData
	};
}
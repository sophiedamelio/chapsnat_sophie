import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  // const updateUserData = (ref) => {
  //   getDoc(ref).then((snapshot) => {
  //     console.log("updating user info!", snapshot.data());
  //     setUserData({...snapshot.data(), getUpdates: () => updateUserData(ref)});
  //   });
  // }

	useEffect(() => {
    console.log("useEffect in custom hook")
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("HI I HAVE LOGGA IN YES");
        const userDataRef = doc(db, 'Users', user.uid);
        getDoc(userDataRef).then((snapshot) => {
          console.log("got user info?", snapshot.data());
          if (user) setUserData(snapshot.data());
        });

        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
        setUserData(undefined);
      }
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user,
    userData
	};
}
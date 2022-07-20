import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './UserStack';
import AuthStack from './AuthStack';

export default function RootNavigation() {
	const { user } = useAuthentication();

	const { userData } = useAuthentication();

	//console.log(user, "<-- user in index.js")
	//console.log(userData, "<---- user data in index.js")

	return user ? <UserStack userData={userData} /> : <AuthStack />;
}
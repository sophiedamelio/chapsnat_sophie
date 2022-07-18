import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, onSnapshot, doc, query } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import db from "../firebase.js";

export default function HomeScreen({ navigation }) {

	const auth = getAuth();
	const user = auth.currentUser;

	useEffect(() => {
		console.log(user, "<-- curr user in home screen, we need this log to re-render the page")
	});

	if (user !== null) {
		return (
			<View style={styles.container}>
			{/* this does not update properly at the moment... */}
			<Text>Hello, {user.email}! </Text>

			<TouchableOpacity style={styles.logoutBtn} onPress={() => {
				signOut(auth).then(() => {
					// Sign-out successful.
					user = null;
				}).catch((error) => {
					// An error happened.
				});
				console.log(auth, "<---- auth")
				navigation.navigate("Login")
			}}>
				<Text style={styles.loginText}>sign out</Text>
			</TouchableOpacity>


			<TouchableOpacity
				onPress={() => navigation.navigate("Chat")}
			>
				<Text style={styles.item}>Chat</Text>
			</TouchableOpacity>
			</View>
			)
	} else if (user === null) {
		return (
		<View style={styles.container}>
		<TouchableOpacity
			onPress={() => navigation.navigate("Login")}
		>
			<Text style={styles.item}>login</Text>
		</TouchableOpacity>

		<TouchableOpacity
			onPress={() => navigation.navigate("Signup")}
		>
			<Text style={styles.item}>signup</Text>
		</TouchableOpacity>

			
		</View>
		);
	}
	
}

const styles = StyleSheet.create({
	logoutBtn: {
		marginLeft: 250
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});
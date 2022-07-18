import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, onSnapshot, doc, query } from 'firebase/firestore';

import db from "../firebase.js";

export default function HomeScreen({ navigation }) {
	const [chatList, setChatList] = useState([]);

	//useEffect(() => {
	//			// begin updating this code for web 9
	//	//const chatsRef = collection(db, "Chats");

	//	//let unsubscribeFromNewSnapshots = onSnapshot(chatsRef, (querySnapshot) => {
	//	//	querySnapshot.forEach((doc) => {
	//	//		console.log(doc, "<---- doc")
	//	//		setChatList([...chatList], doc.data().value)
	//	//	})
	//	//	console.log(chatList, "<---- chatList")
	//	//})
	//	async function getChatList(){
	//		const querySnapshot = await getDocs(collection(db, "Chats"));

	//		querySnapshot.forEach((doc) => {
	//			//console.log(doc.id)
	//			setChatList([...chatList], doc.id)
	//			console.log(chatList, "<--- chatlist in the loop")
	//		})
	//	}

	//	//return function cleanupBeforeUnmounting() {
	//	getChatList();
	//	console.log(chatList, "<---- chatList")
	//	//};

	//}, [])


return (
	<View style={styles.container}>

	<TouchableOpacity
		onPress={() => navigation.navigate("Chat")}
	>
		<Text style={styles.item}>Chat</Text>
	</TouchableOpacity>

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

const styles = StyleSheet.create({
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
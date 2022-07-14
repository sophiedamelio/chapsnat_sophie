import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, onSnapshot, doc, query } from 'firebase/firestore';

import db from "../firebase";

export default function HomeScreen({ navigation }) {
	const [chatList, setChatList] = useState([]);

	useEffect(() => {
		// begin updating this code for web 9
		const q = query(collection(db, "Chats"));

		let unsubscribeFromNewSnapshots = onSnapshot(q, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setChatList([...chatList], doc.data().name)
			})
			console.log(chatList, "<---- chatList")
		})

		return function cleanupBeforeUnmounting() {
			unsubscribeFromNewSnapshots();
		};

		//let chatsRef = db.collection("Chats");
		//chatsRef.get().then((querySnapshot) => {
		//let newChatList = [];
		//querySnapshot.forEach((doc) => {
		//	let newChat = { ...doc.data() };
		//	newChat.id = doc.id;
		//	newChatList.push(newChat);
		//	console.log(newChatList);
		//});
		//setChatList(newChatList);
    //});
	}, []);

return (
	<View style={styles.container}>
		<FlatList
			data={chatList}
			renderItem={({ item }) => (
			<TouchableOpacity
				onPress={() => navigation.navigate("Chat")}
			>
				<Text style={styles.item}>{item.id}</Text>
			</TouchableOpacity>
			)}
		/>
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
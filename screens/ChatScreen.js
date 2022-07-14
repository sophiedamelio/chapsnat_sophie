import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';

export default function ChatScreen({ navigation }) {
const [messages, setMessages] = useState([]);

useEffect(() => {
	let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
		console.log("New Snapshot! ", snapshot.data().messages);
		setMessages(snapshot.data().messages);
	});

	return function cleanupBeforeUnmounting() {
		unsubscribeFromNewSnapshots();
	};
}, []);

const onSend = useCallback((messages = []) => {
	db.collection("Chats")
		.doc("myfirstchat")
		.update({
		// arrayUnion appends the message to the existing array
		messages: firebase.firestore.FieldValue.arrayUnion(messages[0]),
		});
	setMessages((previousMessages) =>
		GiftedChat.append(previousMessages, messages)
	);
}, []);

return (
	<GiftedChat
		messages={messages}
		onSend={(messages) => onSend(messages)}
		user={{
			// current "blue bubble" user
			_id: "1",
			name: "Ashwin",
			avatar: "https://placeimg.com/140/140/any",
		}}
		inverted={true}
		showUserAvatar={true}
		renderUsernameOnMessage={true}
	/>
);
}
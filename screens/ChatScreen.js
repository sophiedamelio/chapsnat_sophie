import React, { useState, useCallback, useEffect } from "react";
import { TouchableOpacity, Text} from "react-native"
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
//import firebase from "firebase/app";
import { collection, getDocs, arrayUnion, updateDoc, onSnapshot, doc } from 'firebase/firestore';

import { useAuthentication } from '../utils/hooks/useAuthentication'; // check out example from Index.js, you already have done this in your proj

const getLastID = (array) => array && array?.length > 0 ? array[array.length - 1].id : "";

export default function ChatScreen({ navigation }) {
	const [messages, setMessages] = useState([]);

	const { user, userData } = useAuthentication(); // getting the user data from chatscreen, so we can use someone's data in giftedchat
	// print out data

	console.log(user, "<-- user in chat")
	console.log(userData, "<--- user data")


	//useEffect(() => {
	//	let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
	//		//console.log("New Snapshot! ", snapshot.data().messages);
	//		setMessages(snapshot.data().messages);
	//	});



	useEffect(() => {
		let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
		const fixTimestampMessages = snapshot.data().messages.map( obj => (
			{ ...obj, createdAt: obj.createdAt.toDate() }
		));
			setMessages(fixTimestampMessages);
		});

		return function cleanupBeforeUnmounting() {
			unsubscribeFromNewSnapshots();
		};
	}, []);

	//const onSend = useCallback(async (messages = []) => {
	//	await updateDoc(doc(db, "Chats", "myfirstchat"), {
	//		messages: arrayUnion(messages[0])
	//	});
	//	setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
	//}, []);

	const onSend = (newMessages = []) => {
		// just send it to firebase, we'll get it back in the snapshot
		// might be a little delay but eh
		updateDoc(doc(db, "Chats", "myfirstchat"), {
			messages: arrayUnion(newMessages[0])
		});
	};

return (
	<GiftedChat
		messages={messages}
		//onSend={(messages) => onSend(messages)}
		onSend={(sentMessages) => onSend(sentMessages)}
		user={{
			// null checking / give default
			// current "blue bubble" user
			_id: "1",
			name: user.username
			//avatar: "https://placeimg.com/140/140/any",
		}}
		inverted={false}
		showUserAvatar={true}
		renderUsernameOnMessage={true}
	/>
)}
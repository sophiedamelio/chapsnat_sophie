import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import { arrayUnion, updateDoc, onSnapshot, doc } from 'firebase/firestore';
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function ChatScreen({ navigation }) {
	const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

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

	const onSend = (newMessages = []) => {
    // just send it to firebase, we'll get it back in the snapshot
    // might be a little delay but eh
    updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(newMessages[0])
    });
    
	};

return (
  <View style={styles.container}>
    <GiftedChat
      messages={messages}
      onSend={(sentMessages) => onSend(sentMessages)}
      user={{
        // current "blue bubble" user
        _id: user ? user.uid : "anon-user-id",
        name: userData ? userData.username : "Anonymous",
        avatar: "https://placeimg.com/140/140/any",
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  </View>
)}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
    marginTop: -56
	},
});
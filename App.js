import { StatusBar } from 'expo-status-bar';
import db from "./firebase";
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'


export default function App() {
  const [messages, setMessages] = useState([]);
  //const [chatDoc, setChatDoc] = useState(route.params.chatDoc);
  //const { chatName, currUser } = route.params;

  //const fetchMessages = async() => {
  //  const response = db.collection("Chats");
  //  const data = await response.get();
  //  data.docs.forEach(item =>{
  //    console.log(item.data().messages, "<_--- each message?")
  //    setMessages([...messages, item.data().messages])
  //  })
  //}


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

  useEffect(() => {
    let unsubscribeFromNewSnapshots = db
      .collection("Chats")
      .doc("mysecondchat")
      .onSnapshot((snapshot) => {
        console.log("New Snapshot!", snapshot);
        setMessages(snapshot.data().messages);
      });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);


  return (
    //<View style={styles.container}>
    //  <Text>Helloooo up App.js to start working on your app!</Text>
    //  <StatusBar style="auto" />
    //</View>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: "1",
        name: 'Sophie',
        avatar: "https://i.imgur.com/8C9wiYe.png"
      }}
      placeholder={"please type something here..."}
      showUserAvatar={true}
      alwaysShowSend={true}
      renderUsernameOnMessage={true}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

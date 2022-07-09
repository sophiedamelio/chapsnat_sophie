import { StatusBar } from 'expo-status-bar';
import db from "./firebase";
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'


export default function App({ route }) {
  const [messages, setMessages] = useState([]);
  //const [chatDoc, setChatDoc] = useState(route.params.chatDoc);
  //const { chatName, currUser } = route.params;

  const fetchMessages = async()=>{
    const response = db.collection("Chats");
    const data = await response.get();
    data.docs.forEach(item =>{
      setMessages([...messages, item.data()])
    })
  }

  useEffect(() => {
    //db.collection("Chats")
    //.doc("mysecondchat")
    //.get()
    //.then((snapshot) => {
    //  //let newMessages = snapshot.data().messages.map((singleMessage) => {
    //  //  singleMessage.createdAt = singleMessage.createdAt.seconds * 1000;
    //  //  return singleMessage;
    //  //});
    //  console.log(snapshot.id);
    //  console.log(snapshot.data().messages, "<-- data");
    //  setMessages(snapshot.data().messages);
    //});
    fetchMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

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

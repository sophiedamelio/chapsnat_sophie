import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'


export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://i.imgur.com/BZzsME5.jpg',
        }
      }, 
      {
        _id: 2,
        text: 'is this blue?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Sophie',
          avatar: "https://i.imgur.com/8C9wiYe.png"
        }
      }
    ])
  }, [])

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
        _id: 1,
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

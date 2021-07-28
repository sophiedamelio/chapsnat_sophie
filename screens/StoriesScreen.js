import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
} from "react-native";
const image = require("../assets/Stories.png");
export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    top: 0,
    overflow: "visible",
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "@firebase/app";
import Colors from "../constants/Colors";
import React, { useState, useEffect } from "react";
import db from "../firebase";

export default function TestScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text>hi there</Text>
    </View>
  );
}

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 180,
    backgroundColor: "white",
  },
  imageContainer: {
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  snapLogo: {
    height: 150,
    marginBottom: 15,
    width: 150,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  signupButton: {
    backgroundColor: Colors.snapblue,
  },
  signupText: {
    color: "white",
    fontWeight: "bold",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  headerContainer: {
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

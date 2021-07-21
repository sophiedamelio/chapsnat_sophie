import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "@firebase/app";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  let user = firebase.auth().currentUser;

  const [displayName, setDisplayName] = useState(user.displayName);
  const [newName, setNewName] = useState("");

  const onPressLogout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out!");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  const onPressSaveNewName = async () => {
    setModalVisible(!modalVisible);
    const user = firebase.auth().currentUser;
    setDisplayName(newName);

    await user
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        console.log("Updated display name!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerColumn}>
        <TouchableOpacity onPress={() => alert("edit!")}>
          <Image style={styles.userImage} source={{}} />
        </TouchableOpacity>
        <View style={styles.Row}>
          <Text style={styles.userNameText}>{displayName}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              name={"create-outline"}
              size={25}
              style={{ marginBottom: 5, marginLeft: 3 }}
              color={Colors.tabIconDefault}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.Row}>
          <Text style={styles.descriptionText}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.Row}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.logoutButton]}
          onPress={onPressLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <EditModal></EditModal>
    </View>
  );
}

function EditModal() {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Change your name:</Text>
          <TextInput autoFocus={true} onChangeText={setNewName} />

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={onPressSaveNewName}
          >
            <Text style={styles.textStyle}>Save New Name</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerColumn: {
    backgroundColor: "transparent",
    paddingBottom: 20,
    paddingTop: 45,
    justifyContent: "center",
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  descriptionText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: Colors.tintColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
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
  logoutButton: {
    backgroundColor: Colors.snapblue,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    marginTop: 300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {useState} from "react"


export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const auth = getAuth();

	async function handleSubmit() {
		console.log("handle submit envoked!!")
		console.log(email, "<--- email")
		console.log(password, "<--- pass")
	

		await signInWithEmailAndPassword(auth, email, password)
		//console.log("hello???")
		.then((userCredential) => {
			// Signed in 
			console.log(userCredential, "<--- user cred")
			const user = userCredential.user;
			//auth.currentUser = user;
			//console.log(user, "<---- userrrrr")
			//return console.log(user, "<--- user in handlesub");
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
		
		let currentUser = auth.currentUser
		console.log(currentUser, "<--- currentUser in login screen")
		return currentUser;
	}

	//let currentUser = auth.currentUser
	//console.log(currentUser, "<--- currentUser in login screen")


	return (
		<>
			<Text style={styles.bigBlue}>Login Here</Text>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Email'
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
				navigation.navigate("Home")
			}}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	inputView: {
		backgroundColor: "#FFC0CB",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
		alignItems: "center",
	},
	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
	},
	loginBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"#FF1493",
	},
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50
	}
})
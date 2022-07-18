import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"


export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const auth = getAuth();

	async function handleSubmit() {
		console.log("handle submit envoked!!")
		//console.log(email, "<--- email")
		//console.log(password, "<--- pass")


		await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			console.log(userCredential, "<--- user cred in signup")
			const user = userCredential.user;
			auth.currentUser = user;
			//console.log(user, "<--- user in signup function")
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
		
		//console.log(newUser, "<--- new user???")
	}
	console.log(auth, "<--- auth")


	return (
		<>
			<Text style={styles.bigBlue}>Signup Here</Text>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Email'
					placeholderTextColor="#003f5c"
					//onChangeText={(email) => setEmail(email)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					//onChangeText={(password) => setPassword(password)}
				/>
			</View>
			
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
				navigation.navigate("Home")
			}}>
				<Text style={styles.loginText}>Signup</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.redirectBtn} onPress={() => {
				navigation.navigate("Login")
			}}>
				<Text>Already have an account? Login here</Text>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	redirectBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"grey",
		color: "white"
	},
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
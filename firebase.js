import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAwQRZEJR-YaBa4uWMl78EUwZNUUzkD0fo",
	authDomain: "chapsnat-6b14b.firebaseapp.com",
	projectId: "chapsnat-6b14b",
	storageBucket: "chapsnat-6b14b.appspot.com",
	messagingSenderId: "1085884931988",
	appId: "1:1085884931988:web:7beed7aaab98fcfa233981"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
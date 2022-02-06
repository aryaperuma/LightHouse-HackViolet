import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyA8vyDV7qocIyuKOyQJIJ6-MiP0v910Uv0",
	authDomain: "fir-chatapp-312b7.firebaseapp.com",
	databaseURL: "https://fir-chatapp-312b7.firebaseio.com",
	projectId: "fir-chatapp-312b7",
	storageBucket: "fir-chatapp-312b7.appspot.com",
	messagingSenderId: "539634066541",
	appId: "1:539634066541:web:bf2db3ac1f63a564a30b64",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export default firebase;

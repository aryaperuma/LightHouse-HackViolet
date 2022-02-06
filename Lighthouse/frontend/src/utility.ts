import firebase, { firestore } from "./FirebaseConfig";

export const handleLogout = async () => {
	try {
		await firebase.auth().signOut();
	} catch (err) {
		console.log(err);
	}
};

export const writeUserData = async (
	userId: any,
	username: any,
	email: any,
	age: any,
	gender: any,
	imageURL: any,
	address: any,
	phone: any,
	aadhar: any,
	SOS_phone: any
) => {
	try {
		console.log(username);
		firestore.collection("users").doc(userId).set({
			name: username,
			email: email,
			gender: gender.value,
			age: age.value,
			aadhar: aadhar.value,
			imageURL: imageURL.value,
			address: address.value,
			phone: phone.value,
			SOS_phone: SOS_phone.value,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getUserData = async (userId: any) => {
	try {
		const userRef = await firestore.collection("users").doc(userId).get();

		return userRef.data();
	} catch (err) {
		console.log(err);
	}
};

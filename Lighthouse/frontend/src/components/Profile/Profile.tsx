import React, { useContext, useEffect, useState } from "react";

import {
	IonButton,
	IonLoading,
	IonApp,
	IonItem,
	IonLabel,
	IonText,
	IonContent,
} from "@ionic/react";

import { firestore } from "../../FirebaseConfig";
import { AuthContext } from "../../context/authContext";
import { handleLogout } from "../../utility";

import { toast } from "../Toast/Toast";

const Profile: React.FC<any> = (props) => {
	const { currentUser } = useContext<any>(AuthContext);
	const { history } = props;
	const [showUser, setShowUser] = useState<any>(null);
	const [isDataReady, setIsDataReady] = useState<boolean>(false);
	const [busy, setBusy] = useState(true);

	useEffect(() => {
		setBusy(true);
		firestore
			.collection("users")
			.doc(currentUser.uid)
			.get()
			.then((doc: any) => {
				const newShowUser: any = {
					imageURL: doc.data().imageURL,
					name: doc.data().name,
					phone: doc.data().phone,
					age: doc.data().age,
					email: doc.data().email,
					gender: doc.data().gender,
				};
				setShowUser(newShowUser);
				setIsDataReady(true);
				setBusy(false);
			})
			.catch((err) => {
				toast(err, 4000);
				setBusy(false);
			});
	}, [currentUser]);

	const signOut = () => {
		handleLogout().then(() => {
			history.push("/");
		});
	};

	const isDataReadyForUse = () => {
		return isDataReady;
	};

	return (
		<IonApp style={{ marginTop: "50px" }}>
			<IonLoading message="Please wait" duration={0} isOpen={busy} />
			{isDataReadyForUse() && (
				<IonContent>
					<IonItem>
						<img
							style={{
								display: "block",
								marginLeft: "auto",
								marginRight: "auto",
								height: "30vh",
							}}
							src={showUser.imageURL}
							alt="loading"
						/>
					</IonItem>
					<IonItem>
						<IonLabel>Name</IonLabel>
						<IonText>{showUser.name}</IonText>
					</IonItem>
					<IonItem>
						<IonLabel>Gender</IonLabel>
						<IonText>{showUser.gender}</IonText>
					</IonItem>
					<IonItem>
						<IonLabel>
							Age <IonText>{showUser.age}</IonText>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel>Phone</IonLabel>
						<IonText>{showUser.phone}</IonText>
					</IonItem>
					<IonButton onClick={signOut}>Logout</IonButton>
				</IonContent>
			)}
		</IonApp>
	);
};

export default Profile;

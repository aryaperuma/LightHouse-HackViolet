import React, { useState, useEffect, useContext } from "react";
import firebase, { firestore } from "../../FirebaseConfig";

import { AuthContext } from "../../context/authContext";

import { toast } from "../Toast/Toast";

import BottomBar from "./BottomBar/BottomBar";
import Messeges from "./Messeges/Messeges";

import {
	IonLoading,
	IonInput,
	IonButton,
	IonItem,
	IonApp,
	IonContent,
} from "@ionic/react";

const Forum: React.FC = () => {
	const [busy, setBusy] = useState<boolean>(true);

	const { currentUser } = useContext<any>(AuthContext);

	const Nodes = ["node1", "node2", "node3"];
	const [msg, setmsg] = useState<string>("");
	const [messeges, setmesseges] = useState([]);
	const [currentNode, setCurrentNode] = useState(Nodes[0]);

	const handleSubmit = () => {
		setBusy(true);

		if (msg.trim() === "") {
			toast("Cannot send an Empty msg", 4000);
		} else {
			writeMessageToDB(msg);
		}

		setmsg("");

		setBusy(false);
	};

	const getCurrentTimeDate = () => {
		let date = new Date().getDate(),
			month = new Date().getMonth() + 1,
			year = new Date().getFullYear(),
			hours = new Date().getHours(),
			min = new Date().getMinutes(),
			sec = new Date().getSeconds();

		return (
			date + "/" + month + "/" + year + " @" + hours + ":" + min + ":" + sec
		);
	};

	const writeMessageToDB = (message: any) => {
		if (currentNode.trim() !== "") {
			firestore
				.collection("users")
				.doc(currentUser.uid)
				.get()
				.then((doc: any) => {
					firebase.database().ref(`messages/${currentNode}`).push({
						userID: currentUser.uid,
						text: message,
						name: doc.data().name,
						email: currentUser.email,
						imageURL: doc.data().imageURL,
						time: getCurrentTimeDate(),
					});
				})
				.catch((err) => {
					toast(err, 2000);
				});
		} else {
			alert("assigning you a node");
		}
	};

	useEffect(() => {
		setBusy(true);
		if (currentNode.trim() !== "") {
			let messegeDB = firebase.database().ref(`messages/${currentNode}`);

			messegeDB.on("value", (snapshot) => {
				let newMesseges: any = [];
				snapshot.forEach((child) => {
					let messege = child.val();

					newMesseges.push({
						id: child.key,
						text: messege.text,
						name: messege.name,
						email: messege.email,
						time: messege.time,
						imageURL: messege.imageURL,
					});
				});

				setmesseges(newMesseges);
				setBusy(false);
			});
		} else {
			alert("assigning you a node");
		}
	}, [currentNode]);

	function getRndInteger() {
		let max = Nodes.length,
			min = 0;

		return Math.floor(Math.random() * (max - min)) + min;
	}

	const changeNode = () => {
		let temp = Nodes[getRndInteger()];
		setCurrentNode(temp);
	};

	const keyPressed = (event: any) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<IonApp>
			<IonContent class="scroll-content">
				<IonLoading message="Please wait" duration={0} isOpen={busy} />
				<Messeges messeges={messeges} currentUser={currentUser} />
				<BottomBar>
					<IonItem>
						<IonInput
							value={msg}
							onKeyPress={keyPressed}
							onIonChange={(event: any) => setmsg(event.target.value)}
							pattern="text"
							placeholder="Type a messege"
						/>
						<IonButton onClick={handleSubmit}>Send</IonButton>
					</IonItem>
				</BottomBar>
			</IonContent>
		</IonApp>
	);
};

export default Forum;

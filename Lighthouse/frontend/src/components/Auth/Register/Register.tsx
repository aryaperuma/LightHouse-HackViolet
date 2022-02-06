import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";

import firebase from "../../../FirebaseConfig";
import { writeUserData } from "../../../utility";

import Form from "react-bootstrap/Form";

import Alert from "react-bootstrap/Alert";

import {
	IonCard,
	IonItem,
	IonInput,
	IonButton,
	IonLabel,
	IonCheckbox,
	IonApp,
	IonPage,
	IonContent,
	IonLoading,
} from "@ionic/react";

const Signup: React.FC<any> = (props) => {
	const { history, setFormDisplay } = props;
	const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
	const [formError, setFormError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);

	const handleSignUp = useCallback(
		async (
			email,
			password,
			userName,
			age,
			gender,
			imageURL,
			address,
			phone,
			aadhar,
			SOS_phone
		) => {
			try {
				const userCredentials: any = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password);

				writeUserData(
					userCredentials.user.uid,
					userName,
					email,
					age,
					gender,
					imageURL,
					address,
					phone,
					aadhar,
					SOS_phone
				);
				setIsLoading(false);
				history.push("/");
			} catch (err) {
				setError(err);
				setIsLoading(false);
			}
		},
		[history]
	);

	const formSubmit = useCallback(
		(event) => {
			event.preventDefault();
			setError(null);

			const {
				username,
				email,
				password,
				age,
				gender,
				imageURL,
				address,
				phone,
				aadhar,
				SOS_phone,
			} = event.target.elements;

			console.log(
				username,
				email,
				password,
				age,
				gender,
				imageURL,
				address,
				phone,
				aadhar,
				SOS_phone
			);

			setIsLoading(true);
			setFormError(false);
			handleSignUp(
				email.value,
				password.value,
				username.value,
				age,
				gender,
				imageURL,
				address,
				phone,
				aadhar,
				SOS_phone
			);
		},
		[handleSignUp]
	);

	return (
		<IonApp
			style={{
				marginTop: "50px",
			}}
		>
			<IonPage>
				<IonContent>
					<IonLoading message="Please wait" duration={0} isOpen={isLoading} />
					<IonCard
						style={{
							width: "80%",
							maxWidth: "600px",
							margin: "auto",
						}}
					>
						<h2>Register</h2>
						<Form onSubmit={formSubmit}>
							{formError && (
								<Alert variant="danger">Invalid email or password!</Alert>
							)}
							{error && <Alert variant="danger">{error.message}</Alert>}
							<IonItem>
								<IonInput name="username" type="text" placeholder=" username" />
							</IonItem>
							<IonItem>
								<IonInput name="email" type="email" placeholder=" email" />
							</IonItem>
							<IonItem>
								<IonInput
									name="password"
									type={hiddenPassword ? "password" : "text"}
									placeholder="Password"
								/>
							</IonItem>
							<IonItem>
								<IonInput name="age" type="number" placeholder=" Age" />
							</IonItem>
							<IonItem>
								<IonInput name="gender" type="text" placeholder=" Gender" />
							</IonItem>
							<IonItem>
								<IonInput name="imageURL" type="text" placeholder=" imageURL" />
							</IonItem>
							<IonItem>
								<IonInput name="address" type="text" placeholder=" address" />
							</IonItem>
							<IonItem>
								<IonInput name="phone" type="number" placeholder=" address" />
							</IonItem>
							<IonItem>
								<IonInput name="aadhar" type="number" placeholder=" Aadhar" />
							</IonItem>
							<IonItem>
								<IonInput
									name="SOS_phone"
									type="number"
									placeholder=" SOS_phone"
								/>
							</IonItem>
							<IonItem>
								<IonCheckbox
									color="primary"
									slot="start"
									onIonChange={(event) => setHiddenPassword(!hiddenPassword)}
								></IonCheckbox>
								<IonLabel>Show Password</IonLabel>
							</IonItem>
							<IonButton color="danger" type="submit">
								Register
							</IonButton>
							<IonItem>
								<IonLabel>Already have an account?</IonLabel>
								<IonButton
									color="primary"
									onClick={(e) => setFormDisplay("login")}
								>
									Login
								</IonButton>
							</IonItem>
						</Form>
					</IonCard>
				</IonContent>
			</IonPage>
		</IonApp>
	);
};

export default withRouter(Signup);

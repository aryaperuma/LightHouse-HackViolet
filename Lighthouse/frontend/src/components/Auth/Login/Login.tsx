import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import {
	IonButton,
	IonItem,
	IonInput,
	IonCard,
	IonLabel,
	IonCheckbox,
	IonLoading,
	IonContent,
	IonApp,
} from "@ionic/react";

import firebase from "../../../FirebaseConfig";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const isValid = (email: any, passwd: any) => {
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
	const validEmail = emailRegex.test(email);
	const validPasswd = passwd.length >= 6;
	return validEmail && validPasswd;
};

const Login: React.FC<any> = (props) => {
	const { history, setFormDisplay } = props;
	const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
	const [formError, setFormError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);

	const handleSignIn = useCallback(
		async (email, password) => {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password);
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
			setIsLoading(true);
			const { email, password } = event.target.elements;
			if (isValid(email.value, password.value)) {
				handleSignIn(email.value, password.value);
				setFormError(false);
			} else {
				setFormError(true);
				setIsLoading(false);
			}
		},
		[handleSignIn]
	);

	return (
		<IonApp
			style={{
				marginTop: "50px",
			}}
		>
			<IonContent>
				<IonCard
					style={{
						width: "80%",
						maxWidth: "600px",
						margin: "auto",
					}}
				>
					<IonLoading message="Please wait" duration={0} isOpen={isLoading} />
					<h2>Login</h2>
					<Form onSubmit={formSubmit}>
						{formError && (
							<Alert variant="danger">Invalid email or password!</Alert>
						)}
						{error && <Alert variant="danger">{error.message}</Alert>}
						<IonItem>
							<IonInput name="email" type="email" placeholder="Enter email" />
						</IonItem>
						<IonItem>
							<IonInput
								name="password"
								type={hiddenPassword ? "password" : "text"}
								placeholder="Password"
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
						<IonButton color="primary" type="submit">
							Login
						</IonButton>
						<IonButton
							color="danger"
							onClick={(e) => setFormDisplay("register")}
						>
							Create an account
						</IonButton>
					</Form>
				</IonCard>
			</IonContent>
		</IonApp>
	);
};

export default withRouter(Login);

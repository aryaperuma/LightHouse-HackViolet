import { IonText } from "@ionic/react";
import React from "react";

import { Link } from "react-router-dom";

const AuthHome: React.FC = () => {
	return (
		<>
			<IonText className="ion-padding">Home Page</IonText>
			<br></br>
			<Link to="/login">Login</Link>
			<p></p>
			<Link to="/register">Register</Link>
		</>
	);
};

export default AuthHome;

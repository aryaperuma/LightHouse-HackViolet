import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { AuthContext } from "../../context/authContext";

import { NavLink, withRouter } from "react-router-dom";
import classes from "./TopBar.module.css";

import { home, map, personSharp } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const TopBar: React.FC = () => {
	const { currentUser } = useContext<any>(AuthContext);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
			{currentUser ? (
				<div className={classes.navTabBar}>
					<Nav>
						<NavLink to="/" className={classes.whiteText}>
							<IonIcon src={home} />
						</NavLink>
					</Nav>
					<Nav>
						<NavLink to="/maps" className={classes.whiteText}>
							<IonIcon src={map} />
						</NavLink>
					</Nav>
					<Nav>
						<NavLink to="/profile" className={classes.whiteText}>
							<IonIcon src={personSharp} />
						</NavLink>
					</Nav>
				</div>
			) : null}
		</Navbar>
	);
};

export default withRouter(TopBar);

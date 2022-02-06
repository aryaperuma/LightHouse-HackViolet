import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/authContext";

import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Forum from "../Forum/Forum";

const Home: React.FC = () => {
	const { currentUser } = useContext<any>(AuthContext);
	const [formDisplay, setFormDisplay] = useState<string>("login");

	return (
		<>
			{currentUser ? (
				<>
					<Forum />

				</>
			) : (
					<>
						{formDisplay === "login" ? (
							<Login setFormDisplay={setFormDisplay} />
						) : (
								<Register setFormDisplay={setFormDisplay} />
							)}
					</>

				)}
		</>
	);
};

export default Home;

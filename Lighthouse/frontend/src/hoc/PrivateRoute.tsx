import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute: React.FC<any> = ({ component: Component, path: Path, ...rest }) => {
	const { currentUser } = useContext<any>(AuthContext);

	return (
		<Route
			path={Path}
			render={(props) =>
				!!currentUser && !!currentUser.uid ? (
					<Component {...props} {...rest} />
				) : (
						<>
							<Redirect to="/" />
							{console.log("Nigg")}
						</>
					)
			}
		/>
	);
};

export default PrivateRoute;

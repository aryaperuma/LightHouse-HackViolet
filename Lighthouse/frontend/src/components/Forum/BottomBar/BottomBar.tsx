import React from "react";
import CSS from 'csstype';

const BottomBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const phantomDivStyle: CSS.Properties = {
		display: "block",
		height: "50px",
		width: "100%",
	};

	const footerStyle: CSS.Properties = {
		fontSize: "10px",
		color: "white",
		borderTop: "1px solid #e7e7e7",
		textAlign: "center",
		position: "fixed",
		left: 0,
		bottom: "0px",
		height: "50px",
		width: "100%",
	};

	return (
		<div>
			<div style={phantomDivStyle} />
			<div style={footerStyle}>{children}</div>
		</div>
	);
};

export default BottomBar;

import React from "react";
import { IonAvatar, IonCardSubtitle } from "@ionic/react";

import "./MyCard.css";

const MyCard: React.FC<{ name: string, text: string, time: string, imageURL: string }> = ({ name, text, time, imageURL }) => {
	return (
		<div className="my-card-container" style={{ width: "60vw" }}>
			<IonAvatar slot="end" style={{ padding: "10px" }}>
				<img
					style={{
						height: "30px",
						width: "30px",
					}}
					src={imageURL}
					alt="loading"
				/>
			</IonAvatar>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					fontSize: "small",
					padding: "5px",
				}}
			>
				<IonCardSubtitle style={{ color: "#ececec" }}>{name}</IonCardSubtitle>
				<p style={{ color: "white" }}>{text}</p>
				<IonCardSubtitle >
					<small>{time}</small>
				</IonCardSubtitle>
			</div>
		</div>
	);
};

export default MyCard;

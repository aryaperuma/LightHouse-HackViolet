import React from "react";
import { IonAvatar, IonCardSubtitle } from "@ionic/react";

import "./OtherCard.css";

const OtherCard: React.FC<{ name: string, text: string, time: string, imageURL: string }> = ({ name, text, time, imageURL }) => {
	return (
		<div className="other-card-container" style={{ width: "60vw" }}>
			<IonAvatar slot="start" style={{ padding: "10px" }}>
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
				<IonCardSubtitle style={{ color: "#222428" }}>{name}</IonCardSubtitle>
				<p>{text}</p>
				<IonCardSubtitle >
					<small>{time}</small>
				</IonCardSubtitle>
			</div>
		</div>
	);
};

export default OtherCard;

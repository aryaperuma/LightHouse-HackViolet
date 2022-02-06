import React from "react";

import MyCard from "../MyCard/MyCard";
import OtherCard from "../OtherCard/OtherCard";

import { IonList } from "@ionic/react";

const Messeges: React.FC<{ messeges: any, currentUser: any }> = ({ messeges, currentUser }) => {

	const messagesEndRef: any = React.useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	}

	React.useEffect(scrollToBottom, [messeges]);

	const returnMsgComponent = (text: string, name: string, email: string, time: string, imageURL: string) => {
		if (email === currentUser.email) {
			return (
				<div style={{ display: "flex" }}>
					<div style={{ flex: 1, width: "40vw" }}></div>
					<MyCard name={name} text={text} time={time} imageURL={imageURL} />
				</div>
			);
		} else {
			return (
				<div style={{ display: "flex" }}>

					<OtherCard name={name} text={text} time={time} imageURL={imageURL} />
					<div style={{ flex: 1, width: "40vw" }}></div>
				</div>
			);
		}
	};

	return (
		<IonList style={{ overflow: "auto", marginTop: "50px" }}>
			{messeges.map((msg: any, id: string | number | undefined) => (
				<div key={id} >
					{returnMsgComponent(
						msg.text,
						msg.name,
						msg.email,
						msg.time,
						msg.imageURL
					)}
				</div>
			))}
			<div ref={messagesEndRef} />
		</IonList>
	);
};

export default Messeges;

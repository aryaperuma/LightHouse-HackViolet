import React, { useState, useEffect } from "react";
import { DisplayMapFC } from "./DisplayMapFC";
import { IonLoading, IonApp } from "@ionic/react";
import { Geolocation } from "@ionic-native/geolocation";

const Maps: React.FC = () => {
	const [currentLocation, setCurrentLocation] = useState<any>(null);
	const [busy, setBusy] = useState<boolean>(false);

	useEffect(() => {
		setBusy(true);
		Geolocation.getCurrentPosition()
			.then((resp) => {
				// let temp: any = {
				// 	lat: resp.coords.latitude,
				// 	lng: resp.coords.longitude,
				// };
				let temp: any = {
					lat: 22.5726,
					lng: 88.3639,
				};
				setCurrentLocation(temp);
			})
			.catch((error) => {
				console.log(error);
			});

		// Geolocation.watchPosition({}, (resp, err) => {
		// 	if (!currentLocation && !err) {
		// 		let temp = {
		// 			lat: resp.coords.latitude,
		// 			lng: resp.coords.longitude,
		// 		};
		// 		setCurrentLocation(temp);
		// 	} else if (
		// 		!err &&
		// 		currentLocation &&
		// 		(currentLocation.lat !== resp.coords.latitude ||
		// 			currentLocation.lng !== resp.coords.longitude)
		// 	) {
		// 		let temp = {
		// 			lat: resp.coords.latitude,
		// 			lng: resp.coords.longitude,
		// 		};
		// 		setCurrentLocation(temp);
		// 	}
		// });
		setBusy(false);
	}, []);

	return (
		<IonApp>
			<IonLoading message="Please wait" duration={0} isOpen={busy}></IonLoading>
			<DisplayMapFC currentLocation={currentLocation} />
		</IonApp>
	);
};

export default Maps;

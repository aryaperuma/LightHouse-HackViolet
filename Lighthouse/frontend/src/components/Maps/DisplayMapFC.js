import React, { useState, useContext,useEffect } from "react";
import { toast } from "../Toast/Toast";

import classes from "../PanicButton/PanicButton.module.css";
import SOSIcon from "../../assets/SOSIcon.svg";

import { firestore } from "../../FirebaseConfig";
import { AuthContext } from "../../context/authContext";
import { handleLogout } from "../../utility";

import { SMS as sms } from "@ionic-native/sms";

import {
	IonInput,
	IonButton,
	IonItem,
	IonLabel,
	IonLoading,
	IonApp,
	IonContent,
	IonFab,
	IonIcon,
} from "@ionic/react";

import Red from "../../assets/Red.svg";
import Blue from "../../assets/Blue.svg";
import Green from "../../assets/Green.svg";

import cords from "./cord.json";

import "./DisplayMapFC.css";

export const DisplayMapFC = ({ currentLocation }) => {
	const { currentUser } = useContext(AuthContext);
	const H = window.H;
	const platform = new H.service.Platform({
		apikey: "EufZOdnJDhlSV9-Cbp19GQfdgEklWjADwlees-i_xO0",
	});

	const [busy, setBusy] = useState(true);
	const mapRef = React.useRef(null);
	const [hMapRef, sethMapRef] = useState(null);

	const [destinationAddress, setDestinationAddress] = useState("");
	const [destinationCords, setDestinationCords] = useState(null);
	const [avoidCords, setAvoidCords] = useState([]);

	const [isFindButtonPressed, setIsFindButtonPressed] = useState(false);
	const [isMyLocationBtnPressed, setIsMyLocationBtnnPressed] = useState(false);

	const userMarker = new H.map.Icon(Blue);
	const destinationMarker = new H.map.Icon(Green);
	const avoidLocationMarker = new H.map.Icon(Red);

	useEffect(() => {
		let newAvoid = [];
		for (let i in cords) {
			newAvoid.push({
				lat: cords[i].lat,
				lng: cords[i].lng,
			});
		}

		setAvoidCords(newAvoid);
	}, []);

	const geocode = () => {
		if (destinationAddress.trim() === "") return;
		else {
			var geocoder = platform.getGeocodingService(),
				geocodingParameters = {
					searchText: destinationAddress,
					jsonattributes: 1,
				};

			geocoder.geocode(
				geocodingParameters,
				(result) => {
					let locations = result.response.view[0].result;

					let position = {
						lat: locations[0].location.displayPosition.latitude,
						lng: locations[0].location.displayPosition.longitude,
					};

					setDestinationCords(position);
				},
				(err) => {
					toast(err);
				}
			);
		}
	};

	useEffect(() => {
		if (!mapRef.current) return;
		if (!currentLocation) return;

		const defaultLayers = platform.createDefaultLayers();
		const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
			center: { lat: currentLocation.lat, lng: currentLocation.lng },
			zoom: 12,
			pixelRatio: window.devicePixelRatio || 1,
		});

		sethMapRef(hMap);

		const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
		const ui = H.ui.UI.createDefault(hMap, defaultLayers);
		console.log(behavior, ui);

		setBusy(false);

		return () => {
			hMap.dispose();
		};
	}, [mapRef, currentLocation]);

	useEffect(() => {
		setIsFindButtonPressed(false);
		geocode();
	}, [destinationAddress]);

	const handleFindDestination = () => {
		setBusy(true);
		if (destinationAddress.trim() === "") {
			setBusy(false);
			return toast("Destination can not be empty");
		}

		let markers = [];
		hMapRef.removeObjects(hMapRef.getObjects());

		if (destinationCords) {
			console.log(destinationCords);
			const donorLocation = new window.H.map.Marker(
				{ lat: destinationCords.lat, lng: destinationCords.lng },
				{ icon: destinationMarker }
			);
			markers.push(donorLocation);
		}

		if (isMyLocationBtnPressed) {
			console.log(currentLocation.lat, currentLocation.lng);
			const userLocation = new window.H.map.Marker(
				{ lat: currentLocation.lat, lng: currentLocation.lng },
				{ icon: userMarker }
			);
			markers.push(userLocation);
		}

		let group = new H.map.Group();

		group.addObjects(markers);
		hMapRef.addObject(group);

		hMapRef.getViewModel().setLookAtData({
			bounds: group.getBoundingBox(),
		});

		setIsFindButtonPressed(true);

		setBusy(false);
	};

	const setCurrentLocationMarkerOnMap = (zoom) => {
		if (!currentLocation) return;
		setBusy(true);
		var userCurrentLocation = new H.map.Marker(
				{ lat: currentLocation.lat, lng: currentLocation.lng },
				{ icon: userMarker }
			),
			group = new H.map.Group();

		group.addObjects([userCurrentLocation]);
		hMapRef.addObject(group);

		hMapRef.getViewModel().setLookAtData({
			bounds: group.getBoundingBox(),
			zoom: zoom,
		});
		setBusy(false);
		toast("Showing your location", 2000);
	};

	const handleMyLocation = () => {
		setIsMyLocationBtnnPressed(true);

		setCurrentLocationMarkerOnMap(16);
	};

	// const getAvoidCoordinates = () => {
	// 	if (avoidCords.length > 1) {
	// 	}

	// 	const circle = new H.map.Circle(
	// 		{ lat: midpointX, lng: midpointY },
	// 		radius,
	// 		{
	// 			style: {
	// 				strokeColor: "rgba(55, 85, 170, 0.6)",
	// 				lineWidth: 2,
	// 				fillColor: "rgba(0, 128, 0, 0.7)",
	// 			},
	// 		}
	// 	);
	// 	hMapRef.addObject(circle);
	// };

	const handlePanic = () => {
		console.log("panic");

		let lineString1 = new H.geo.LineString();
		lineString1.pushPoint({
			lat: currentLocation.lat,
			lng: currentLocation.lng,
		});
		lineString1.pushPoint({
			lat: currentLocation.lat + 0.15,
			lng: currentLocation.lng + 0.15,
		});

		var userCurrentLocation1 = new H.map.Marker(
			{ lat: currentLocation.lat + 0.15, lng: currentLocation.lng + 0.15 },
			{ icon: userMarker }
		)
		var userCurrentLocation2 = new H.map.Marker(
			{ lat: currentLocation.lat - 0.15, lng: currentLocation.lng - 0.15 },
			{ icon: userMarker }
		
		)

		hMapRef.addObject(userCurrentLocation1);
		hMapRef.addObject(userCurrentLocation2);

		hMapRef.addObject(
			new H.map.Polyline(lineString1, {
				style: { lineWidth: 4, strokeColor: "yellow" },
			})
		);


		let lineString2 = new H.geo.LineString();
		lineString2.pushPoint({
			lat: currentLocation.lat,
			lng: currentLocation.lng,
		});
		lineString2.pushPoint({
			lat: currentLocation.lat - 0.15,
			lng: currentLocation.lng - 0.15,
		});

		hMapRef.addObject(
			new H.map.Polyline(lineString2, {
				style: { lineWidth: 4, strokeColor: "green" },
			})
		);

		sms
			.send("8013165025", `${currentUser} is in danger his Location is:\n Lat:${currentLocation.lat}, lng: ${currentLocation.lng}`)
			.then((suc) => {
				toast("succ");
			})
			.catch((err) => {
				toast("err");
			});
	};
	const distanceBetweenTwoPoints = (x, y) => {
		return Math.sqrt(Math.pow(x.lat - y.lat, 2) + Math.pow(x.lng - y.lng, 2));
	};
	const handleShowRoute = () => {
		setBusy(true);

		hMapRef.removeObjects(hMapRef.getObjects());

		let radius =
			(distanceBetweenTwoPoints(destinationCords, currentLocation) * 100000) /
			2;

		let midPoint = {
			lat: (currentLocation.lat + destinationCords.lat) / 2,
			lng: (currentLocation.lng + destinationCords.lng) / 2,
		};

		let tempAvoid = avoidCords;
		if (tempAvoid.length > 0) {
			tempAvoid.sort(function (x, y) {
				if (
					distanceBetweenTwoPoints(x, midPoint) <
					distanceBetweenTwoPoints(y, midPoint)
				) {
					return -1;
				}
				if (
					distanceBetweenTwoPoints(x, midPoint) >
					distanceBetweenTwoPoints(y, midPoint)
				) {
					return 1;
				}
				return 0;
			});
		}

		let avoidareas = "";
		if (tempAvoid.length > 20) {
			// let count = 0;
			for (let i = 0; i < 4; i += 2) {
				if (distanceBetweenTwoPoints(tempAvoid[i], midPoint) <= radius) {
					let noob = `${tempAvoid[i + 1].lat},${tempAvoid[i + 1].lng};${tempAvoid[i].lat},${tempAvoid[i].lng}!`;

					let desti = new H.map.Marker(
						{ lat: tempAvoid[i + 1].lat, lng: tempAvoid[i + 1].lng },
						{ icon: avoidLocationMarker }
					);
					let desti2 = new H.map.Marker(
						{ lat: tempAvoid[i].lat, lng: tempAvoid[i].lng },
						{ icon: avoidLocationMarker }
					);
					hMapRef.addObject(desti2);
					hMapRef.addObject(desti);

					avoidareas += noob;
				}
			}
		}

		avoidareas = avoidareas.substring(0, avoidareas.length - 1);

		// console.log(avoidareas);

		const request = {
			waypoint0: `geo!${currentLocation.lat},${currentLocation.lng}`,
			waypoint1: `geo!${destinationCords.lat},${destinationCords.lng}`,
			mode: "fastest;car;traffic:disabled",
			avoidareas: `${avoidareas}`,
			representation: "display",
		};

		const router = platform.getRoutingService();

		router.calculateRoute(
			request,
			(response) => {
				const shape = response.response.route[0].shape.map((x) => x.split(","));
				const linestring = new H.geo.LineString();
				shape.forEach((s) => linestring.pushLatLngAlt(s[0], s[1]));
				const routeLine = new H.map.Polyline(linestring, {
					style: { strokeColor: "red", lineWidth: 3 },
				});

				hMapRef.addObject(routeLine);
				hMapRef
					.getViewModel()
					.setLookAtData({ bounds: routeLine.getBoundingBox() });

				toast("Showing safest route", 2000);
				setBusy(false);
			},
			(err) => {
				toast("No route exists", 2000);
				setBusy(false);
			}
		);

		let desti = new H.map.Marker(
				{ lat: destinationCords.lat, lng: destinationCords.lng },
				{ icon: destinationMarker }
			),
			current = new H.map.Marker(
				{ lat: currentLocation.lat, lng: currentLocation.lng },
				{ icon: userMarker }
			),
			group = new H.map.Group();

		group.addObjects([desti, current]);
		hMapRef.addObject(group);

		hMapRef.getViewModel().setLookAtData({
			bounds: group.getBoundingBox(),
		});

		// getAvoidCoordinates();
	};

	const handdleClear = () => {
		setBusy(true);

		hMapRef.removeObjects(hMapRef.getObjects());
		hMapRef.setCenter({ lat: currentLocation.lat, lng: currentLocation.lng });
		hMapRef.setZoom(12);

		setDestinationAddress("");

		setBusy(false);
		toast("Map cleared", 2000);
	};

	return (
		<IonApp>
			<IonLoading message="Please wait" duration={0} isOpen={busy} />
			<div ref={mapRef} className="map-container" />
			<IonContent>
				<div className="bottom-bar-marker-info-container">
					<IonItem className="bottom-bar-marker-info-ion-icon">
						<IonLabel>Your Location</IonLabel>
						<img src={Blue} height="45px" width="45px" alt="" />
					</IonItem>
					<IonItem className="bottom-bar-marker-info-ion-icon">
						<IonLabel>Destination</IonLabel>
						<img src={Green} height="50px" width="50px" alt="" />
					</IonItem>
					<IonItem className="bottom-bar-marker-info-ion-icon">
						<IonLabel>Unsafe Location</IonLabel>
						<img src={Red} height="50px" width="50px" alt="" />
					</IonItem>
				</div>
				<IonItem>
					<IonInput
						value={destinationAddress}
						type="text"
						placeholder="Enter Destination"
						onIonChange={(e) => {
							setDestinationAddress(e.target.value);
						}}
					/>
					<IonButton color="warning" onClick={handleFindDestination}>
						Find
					</IonButton>
				</IonItem>
				<IonItem>
					<div className="bottom-bar-buttons-container">
						<IonButton onClick={handleMyLocation}>My Location</IonButton>
						<IonButton
							color="success"
							onClick={handleShowRoute}
							disabled={!isFindButtonPressed}
						>
							Show Route
						</IonButton>
						<IonButton color="danger" onClick={handdleClear}>
							Clear
						</IonButton>
					</div>
				</IonItem>
			</IonContent>
			<IonFab
				vertical="top"
				horizontal="end"
				slot="fixed"
				className={classes.panicBtnContainer}
			>
				<IonIcon
					onClick={handlePanic}
					src={SOSIcon}
					className={classes.panicBtnIcon}
				></IonIcon>
			</IonFab>
		</IonApp>
	);
};

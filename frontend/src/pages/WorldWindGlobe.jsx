import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import WorldWind from "@nasaworldwind/worldwind";

const WorldWindGlobe = () => {
	let [allocations, setAllocations] = useState({});
	const canvasRef = useRef(null);

	useEffect(() => {  
		axios
			.get("http://localhost:9090/powerplant/dailyPower")
			.then((response) => {
				setAllocations(response.data["allocations"]);
			})
			.catch((error) => {
				console.error(error); 
			});
	}, []); 

	const districts = [
		{ name: "Colombo", latitude: 6.9271, longitude: 79.8612 },
		{ name: "Gampaha", latitude: 7.0912, longitude: 79.9985 },
		{ name: "Kalutara", latitude: 6.5854, longitude: 79.9607 },
		{ name: "Kandy", latitude: 7.2906, longitude: 80.6337 },
		{ name: "Matale", latitude: 7.4675, longitude: 80.6234 },
		{ name: "Nuwara Eliya", latitude: 6.9497, longitude: 80.7891 },
		{ name: "Kegalle", latitude: 7.2533, longitude: 80.3464 },
		{ name: "Ratnapura", latitude: 6.6828, longitude: 80.3992 },
		{ name: "Jaffna", latitude: 9.6615, longitude: 80.0255 },
		{ name: "Kilinochchi", latitude: 9.3803, longitude: 80.3847 },
		{ name: "Mullaitivu", latitude: 9.267, longitude: 80.8142 },
		{ name: "Mannar", latitude: 8.9814, longitude: 79.9042 },
		{ name: "Vavuniya", latitude: 8.7518, longitude: 80.4976 },
		{ name: "Kurunegala", latitude: 7.4863, longitude: 80.3647 },
		{ name: "Puttalam", latitude: 8.0362, longitude: 79.8287 },
		{ name: "Ampara", latitude: 7.3028, longitude: 81.6745 },
		{ name: "Batticaloa", latitude: 7.7102, longitude: 81.6745 },
		{ name: "Trincomalee", latitude: 8.5874, longitude: 81.2152 },
		{ name: "Galle", latitude: 6.0535, longitude: 80.221 },
		{ name: "Matara", latitude: 5.9549, longitude: 80.555 },
		{ name: "Hambantota", latitude: 6.1246, longitude: 81.1185 },
		{ name: "Badulla", latitude: 6.9896, longitude: 81.0556 },
		{ name: "Monaragala", latitude: 6.8728, longitude: 81.3509 },
		{ name: "Anuradhapura", latitude: 8.3114, longitude: 80.4037 },
		{ name: "Polonnaruwa", latitude: 7.9396, longitude: 81.0016 },
	];

	// Function to add a placemark
	function addPlaceMark(wwd, lat, lon, district, allocation) {
		const placemarkLayer = new WorldWind.RenderableLayer();
		wwd.addLayer(placemarkLayer);

		const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
		placemarkAttributes.imageOffset = new WorldWind.Offset(
			WorldWind.OFFSET_FRACTION,
			0.3,
			WorldWind.OFFSET_FRACTION,
			0.0
		);
		placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
			WorldWind.OFFSET_FRACTION,
			0.5,
			WorldWind.OFFSET_FRACTION,
			1.0
		);
		placemarkAttributes.imageSource =
			WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

		const position = new WorldWind.Position(lat, lon, 100.0);
		const placemark = new WorldWind.Placemark(
			position,
			false,
			placemarkAttributes
		);

		placemark.label = district + "\n" + parseFloat(allocation, 2).toFixed(2) + " GWh";
		placemark.alwaysOnTop = true;

		placemarkLayer.addRenderable(placemark);

		// Force a redraw of the WorldWindow to ensure everything renders correctly
		wwd.redraw();
	}

	useEffect(() => {
		try {
			// Create a WorldWindow for the canvas after component mounts
			const wwd = new WorldWind.WorldWindow(canvasRef.current);

			// Add base layers and controls
			const baseLayers = [
				new WorldWind.BMNGOneImageLayer(),
				new WorldWind.BMNGLandsatLayer(),
				new WorldWind.CoordinatesDisplayLayer(wwd),
				new WorldWind.ViewControlsLayer(wwd),
				new WorldWind.CompassLayer(),
			];

			baseLayers.forEach((layer) => {
				wwd.addLayer(layer);
			});

			// Set lookout angle to Sri Lanka
			wwd.navigator.lookAtLocation.latitude = 7.8731;
			wwd.navigator.lookAtLocation.longitude = 80.7718;
			wwd.navigator.range = 0.65e6;
			wwd.redraw();

			// Add placemarks for each district
			districts.forEach((district) => {
				addPlaceMark(
					wwd,
					district.latitude,
					district.longitude,
					district.name,
					allocations[district.name]
				);
			});
 
			// Log layer info for debugging
			console.log("Layers added: ", wwd.layers);
		} catch (error) {
			console.error("Error initializing WorldWind:", error);
		}
	}, []);

	return (
		<div>
			<canvas
				ref={canvasRef}
				id="canvasOne"
				width="1500"
				height="1024"
				style={{ display: "block", margin: "0 auto", backgroundColor: "black" }}
			>
				Your browser does not support HTML5 Canvas.
			</canvas>
		</div>
	);
};

export default WorldWindGlobe;

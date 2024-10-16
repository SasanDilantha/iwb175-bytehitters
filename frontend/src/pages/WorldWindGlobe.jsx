import React, { useEffect, useRef } from "react";
import WorldWind from "@nasaworldwind/worldwind";

const WorldWindGlobe = () => {
	const canvasRef = useRef(null);

    // Function to add a placemark
	function addPlaceMark(wwd, lat, lon, text) {
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

		const position = new WorldWind.Position(55.0, -106.0, 100.0);
		const placemark = new WorldWind.Placemark(
			position,
			false,
			placemarkAttributes
		);

		placemark.label = `Placemark\nLat ${placemark.position.latitude.toPrecision(
			4
		)}\nLon ${placemark.position.longitude.toPrecision(5)}`;
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

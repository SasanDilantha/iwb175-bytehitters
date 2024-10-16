import React, { useEffect, useRef } from "react";
import WorldWind from "webworldwind-esa";

const WorldWindGlobe = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		// Create a WorldWindow for the canvas after component mounts
		const wwd = new WorldWind.WorldWindow(canvasRef.current);

		// Add layers for the base imagery and other functionality
		wwd.addLayer(new WorldWind.BMNGOneImageLayer());
		wwd.addLayer(new WorldWind.BMNGLandsatLayer());
		wwd.addLayer(new WorldWind.CompassLayer());
		wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
		wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

		// Add a placemark
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

		placemark.label =
			"Placemark\n" +
			"Lat " +
			placemark.position.latitude.toPrecision(4).toString() +
			"\n" +
			"Lon " +
			placemark.position.longitude.toPrecision(5).toString();
		placemark.alwaysOnTop = true;

		placemarkLayer.addRenderable(placemark);
	}, []);

	return (
		<div>
			<canvas
				ref={canvasRef}
				id="canvasOne"
				width="1024"
				height="768"
				style={{ display: "block", margin: "0 auto" }}
			>
				Your browser does not support HTML5 Canvas.
			</canvas>
		</div>
	);
};

export default WorldWindGlobe;

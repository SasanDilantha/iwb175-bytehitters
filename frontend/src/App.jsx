import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import WorldWindGlobe from "./pages/WorldWindGlobe";
import PowerPlants from "./pages/PowerPlants";
import Shortage from "./pages/Shortage";
import DisruptionManager from "./pages/DisruptionManager";

const App = () => {
	return (
		<div>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<WorldWindGlobe />} />
						<Route path="/shortage" element={<Shortage />} />
						<Route path="/power-plants" element={<PowerPlants />} />
						<Route path="/disruption-manager" element={<DisruptionManager />} />
					</Routes>
				</Layout>
			</Router>
		</div>
	);
};

export default App;

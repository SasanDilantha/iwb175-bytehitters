import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import WorldWindGlobe from "./pages/WorldWindGlobe";
import PowerPlants from "./pages/PowerPlants";
import Shortage from "./pages/Shortage";
import RequestManager from "./pages/RequestManager";

const App = () => {
	return (
		<div>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<WorldWindGlobe />} />
						<Route path="/shortage" element={<Shortage />} />
						<Route path="/power-plants" element={<PowerPlants />} />
						<Route path="/request-manager" element={<RequestManager />} />
					</Routes>
				</Layout>
			</Router>
		</div>
	);
};

export default App;

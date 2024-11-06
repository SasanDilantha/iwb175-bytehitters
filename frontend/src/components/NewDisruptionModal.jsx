import React, { useState, useEffect } from "react";
import axios from "axios";

const NewDisruptionModal = ({ isOpen, onClose, onDisruptionAdded }) => {
	const [plants, setPlants] = useState([]);
	const [selectedPlantId, setSelectedPlantId] = useState("");
	const [status, setStatus] = useState("act");
	const [produceCapacity, setProduceCapacity] = useState("");

	useEffect(() => {
		// Fetch available power plants that are public and not under repair
		axios
			.get("http://localhost:9090/powerplant/active")
			.then((response) => {
				setPlants(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			plant_id: parseInt(selectedPlantId),
			status,
			produceCapacity: parseFloat(produceCapacity),
		};

		axios
			.post("http://localhost:9090/powerplant/status", data)
			.then((response) => {
				alert("Disruption added successfully!");
				onDisruptionAdded(response.data); 
				onClose(); 
			})
			.catch((error) => {
				console.error("Error adding disruption:", error);
			});
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-4 text-center">
					Add New Power Disruption
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Select Power Plant
						</label>
						<select
							value={selectedPlantId}
							onChange={(e) => setSelectedPlantId(e.target.value)}
							required
							className="w-full px-3 py-2 border rounded-lg"
						>
							<option value="" disabled>Select a Power Plant</option>
							{plants.map((plant) => (
								<option key={plant.id} value={plant.id}>
									{plant.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Status
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							required
							className="w-full px-3 py-2 border rounded-lg"
						>
							<option value="act">Active</option>
							<option value="pact">Partially Active</option>
							<option value="deact">Deactive</option>
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Current Production Capacity (GWh)
						</label>
						<input
							type="number"
							value={produceCapacity}
							onChange={(e) => setProduceCapacity(e.target.value)}
							required
							className="w-full px-3 py-2 border rounded-lg"
							placeholder="Enter capacity in GWh"
						/>
					</div>
					<div className="flex justify-end mt-6">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4 hover:bg-gray-400 transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
						>
							Add Disruption
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewDisruptionModal;
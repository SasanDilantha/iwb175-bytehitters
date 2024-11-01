import React, { useEffect, useState } from "react";
import axios from "axios";
import NewDisruptionModal from "../components/NewDisruptionModal";
import UpdateDisruptionModal from "../components/UpdateDisruptionModal";

const DisruptionManager = () => {
	const [powerPlants, setPowerPlants] = useState([]);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isNewModalOpen, setIsNewModalOpen] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);

	useEffect(() => {
		fetchPowerPlants();
	}, []);

	const fetchPowerPlants = () => {
		axios
			.get("http://localhost:9090/powerplant/under_repair")
			.then((response) => {
				setPowerPlants(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleUpdateClick = (plant) => {
		setSelectedPlant(plant);
		setIsUpdateModalOpen(true);
	};

	const handleNewDisruptionAdded = (newDisruption) => {
		setPowerPlants((prevPlants) => [...prevPlants, newDisruption]);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-6 bg-gray-100">
				<div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center mx-auto max-w-md">
					<h1 className="text-3xl font-bold text-blue-800">
						Disruption Manager
					</h1>
				</div>

				<div>
					<button
						onClick={() => setIsNewModalOpen(true)}
						className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-4"
					>
						Add New
					</button>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
						<thead className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
							<tr>
								<th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">
									Power Plant Name
								</th>
								<th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">
									Status
								</th>
								<th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">
									Current Production Capacity
								</th>
								<th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">
									Location
								</th>
								<th className="py-3 px-6 text-center text-sm font-semibold tracking-wider">
									Update
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-gradient-to-b from-white to-gray-100">
							{powerPlants.map((plant, index) => (
								<tr
									key={index}
									className="hover:bg-gray-50 transition duration-200 ease-in-out"
								>
									<td className="py-4 px-6 whitespace-nowrap">{plant.name}</td>
									<td className="py-4 px-6 whitespace-nowrap">
										{plant.status === "act"
											? "Active"
											: plant.status === "pact"
											? "Partially Active"
											: "Deactive"}
									</td>
									<td className="py-4 px-6 whitespace-nowrap">
										{plant.produce_capacity} GWh
									</td>
									<td className="py-4 px-6 whitespace-nowrap">
										{plant.location}
									</td>
									<td className="py-4 px-6 text-center whitespace-nowrap">
										<button
											className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
											onClick={() => handleUpdateClick(plant)}
										>
											Update
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>

			{/* Update Modal */}
			{isUpdateModalOpen && (
				<UpdateDisruptionModal plant={selectedPlant} onClose={() => setIsUpdateModalOpen(false)} />
			)}
			{/* New Disruption Modal */}
			{isNewModalOpen && (
				<NewDisruptionModal
					isOpen={isNewModalOpen}
					onClose={() => setIsNewModalOpen(false)}
					onDisruptionAdded={handleNewDisruptionAdded}
				/>
			)}
		</div>
	);
};

export default DisruptionManager;

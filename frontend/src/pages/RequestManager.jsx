import React, { useEffect, useState } from "react";
import DisruptionModal from "../components/DisruptionModal"; // Import the UpdateModal component
import axios from "axios";

const RequestManager = () => {
	const [powerPlants, setPowerPlants] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:9090/powerplant/under_repair")
			.then((response) => {
				setPowerPlants(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPlant, setSelectedPlant] = useState(null);

	const handleUpdateClick = (plant) => {
		setSelectedPlant(plant);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		// setSelectedPlant(null);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-6 bg-gray-100">
				{/* Card styled container for heading */}
				<div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center mx-auto max-w-md">
					<h1 className="text-3xl font-bold text-blue-800">
						Distruption Manager
					</h1>
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
			{isModalOpen && (
				<DisruptionModal plant={selectedPlant} onClose={handleModalClose} />
			)}
		</div>
	);
};

export default RequestManager;

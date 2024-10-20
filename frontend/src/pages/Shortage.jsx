import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestModal from "../components/RequestModal";

const Shortage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPlantId, setSelectedPlantId] = useState(null);
	const [nextShotageDate, setNextShortageDate] = useState(""); // State to hold the next shortage date
	const [shortageAmount, setShortageAmount] = useState(0.0); // State to hold the shortage amount
	const [suggestedPowerPlants, setSuggestedPowerPlants] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:9090/powerplant/shortageDate")
			.then((response) => {
				let date = new Date(response.data["shortage_date"]);
				const monthNames = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];
				setNextShortageDate(
					monthNames[date.getMonth() - 1] + " - " + date.getFullYear()
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:9090/powerplant/shortageAmount")
			.then((response) => {
				setShortageAmount(parseFloat(response.data["shortage_amount"]));
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		console.log("Shortage Amount: ", shortageAmount);
		axios
			.post(
				"http://localhost:9090/powerplant/suggestPrivate?shortage_amount=" +
					shortageAmount
			)
			.then((response) => {
				setSuggestedPowerPlants(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleRequest = (id) => {
		console.log("Requesting Power Plant ID:", id);
		setSelectedPlantId(id); // Set the selected power plant ID
		setIsModalOpen(true); // Open the modal
	};

	const handleSubmit = (requestData) => {
		// power_plant_id, request_capacity, request_date, status
		let data = {
			powerPlantId: selectedPlantId,
			requestCapacity: parseFloat(requestData.requestAmount),
			requestDate: requestData.date,
			status: requestData.status,
		}

		axios
			.post("http://localhost:9090/powerplant/request", data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});

		alert(`Request for Power Plant ID ${requestData.id} submitted!`);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-6 bg-gray-100">
				{/* Display Possible Shortage Dates in a styled card */}
				<div className="flex justify-center mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center">
						<h1 className="text-3xl font-bold text-blue-800 mb-4">
							Possible Shortage Date:
						</h1>
						<p className="text-xl text-gray-700 font-bold">{nextShotageDate}</p>
					</div>
				</div>

				<h2 className="text-xl font-semibold mb-4">Private Power Plants</h2>

				{/* Shortage Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-lg shadow-md">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left">Name</th>{" "}
								{/* Name Column */}
								<th className="py-3 px-6 text-left">Capacity</th>{" "}
								{/* Capacity Column */}
								<th className="py-3 px-6 text-left">Location</th>{" "}
								{/* Description Column */}
								<th className="py-3 px-6 text-left text-center">Request</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{suggestedPowerPlants.map((private_plant, index) => (
								<tr
									key={private_plant.id}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6">{private_plant.name}</td>{" "}
									{/* Display Name */}
									<td className="py-3 px-6">
										{private_plant.daily_production_capacity} GWh
									</td>{" "}
									{/* Display Capacity */}
									<td className="py-3 px-6">{private_plant.location}</td>{" "}
									{/* Display Location */}
									<td className="py-3 px-6 text-center">
										<button
											className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 transition"
											onClick={() => handleRequest(private_plant.id)}
										>
											Request
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>

			{/* Request Modal */}
			<RequestModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				powerPlantId={selectedPlantId}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default Shortage;

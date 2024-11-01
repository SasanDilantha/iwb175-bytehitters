import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestModal from "../components/RequestModal";
import UpdateRequestStatusModal from "../components/UpdateRequestStatusModal"

const Shortage = () => {
	const [isRequestModalOpen, setRequestModalOpen] = useState(false);
	const [selectedPlantId, setSelectedPlantId] = useState(null);
	const [nextShotageDate, setNextShortageDate] = useState(""); // State to hold the next shortage date
	const [shortageAmount, setShortageAmount] = useState(0.0); // State to hold the shortage amount
	const [suggestedPowerPlants, setSuggestedPowerPlants] = useState([]);
	const [requests, setRequests] = useState([]);

	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);

	useEffect(() => {
		getShortageDate();
		getShortageAmount();
		getSuggestedPowerPlants();
		getRequests();
	}, [shortageAmount]);

	function getShortageDate() {
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
	}

	function getShortageAmount() {
		axios
			.get("http://localhost:9090/powerplant/shortageAmount")
			.then((response) => {
				setShortageAmount(parseFloat(response.data["shortage_amount"]));
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function getSuggestedPowerPlants() {
		axios
			.post(
				"http://localhost:9090/powerplant/suggestPrivate?shortage_amount=" +
					shortageAmount
			)
			.then((response) => {
				setSuggestedPowerPlants(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function getRequests() {
		axios
			.get("http://localhost:9090/powerplant/requests")
			.then((response) => {
				setRequests(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	const handleRequest = (id) => {
		console.log("Requesting Power Plant ID:", id);
		setSelectedPlantId(id); // Set the selected power plant ID
		setRequestModalOpen(true); // Open the modal
	};

	const handleSubmit = (requestData) => {
		// power_plant_id, request_capacity, request_date, status
		let data = {
			power_plant_id: selectedPlantId,
			request_capacity: parseFloat(requestData.requestAmount),
			request_date: requestData.date,
			status: requestData.status,
		};

		axios
			.post("http://localhost:9090/powerplant/add_request/", data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});

		alert(`Request for Power Plant ID ${requestData.id} submitted!`);
	};

	const handleUpdateRequest = (request) => {
		console.log(request);
		setSelectedRequest(request);
		setUpdateModalOpen(true);
	};

	const handleRequestStatusUpdate = (updatedRequest) => {
		axios
			.put(`http://localhost:9090/powerplant/update_request/`, updatedRequest)
			.then((response) => {
				setRequests((prevRequests) =>
					prevRequests.map((req) =>
						req.id === updatedRequest.id ? response.data : req
					)
				);
				getRequests();
				alert("Status updated successfully!");
			})
			.catch((error) => {
				console.error("Error updating request:", error);
			});
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-6 bg-gray-100">
				{/* Display Possible Shortage Dates in a styled card */}
				<div className="flex justify-center mb-8">
					<div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center">
						<h1 className="text-3xl font-bold text-blue-800 mb-4">
							Possible Shortage Date
						</h1>
						<p className="text-xl text-gray-700 font-bold">{nextShotageDate}</p>
					</div>
					<div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center">
						<h1 className="text-3xl font-bold text-blue-800 mb-4">
							Possible Shortage Amount
						</h1>
						<p className="text-xl text-gray-700 font-bold">{shortageAmount} GWh</p>
					</div>
				</div>

				<h2 className="text-xl font-semibold mb-4">Private Power Plants</h2>

				{/* Shortage Table */}
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-lg shadow-md">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left">Name</th>
								<th className="py-3 px-6 text-left">Capacity</th>
								<th className="py-3 px-6 text-left">Location</th>
								<th className="py-3 px-6 text-left text-center">Request</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{suggestedPowerPlants.map((private_plant, index) => (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6">{private_plant.name}</td>
									{/* Display Name */}
									<td className="py-3 px-6">
										{private_plant.daily_production_capacity} GWh
									</td>
									{/* Display Capacity */}
									<td className="py-3 px-6">{private_plant.location}</td>

									<td className="py-3 px-6 text-center">
										<button
											className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-800 transition"
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

				{/* Request Table */}
				<div>
					<h2 className="text-xl font-semibold mb-4 mt-10">
						Submitted Requests
					</h2>
					<table className="min-w-full bg-white rounded-lg shadow-md pt-40">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left">Plant Name</th>
								<th className="py-3 px-6 text-left">Request Capacity</th>
								<th className="py-3 px-6 text-left">Request Date</th>
								<th className="py-3 px-6 text-left text-center">Status</th>
								<th className="py-3 px-6 text-left text-center">Update</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{requests.map((request, index) => (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6">{request.name}</td>

									<td className="py-3 px-6">{request.request_capacity} GWh</td>

									<td className="py-3 px-6">{request.request_date}</td>

									<td className="py-3 px-6 text-center">
										<span
											className={`px-2 py-1 rounded ${
												request.status === "Approved"
													? "bg-green-200 text-green-800"
													: "bg-red-200 text-red-800"
											}`}
										>
											{request.status}
										</span>
									</td>
									<td className="py-3 px-6 text-center">
										<button
											className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 transition"
											onClick={() => handleUpdateRequest(request)}
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

			{/* Request Modal */}
			<RequestModal
				isOpen={isRequestModalOpen}
				onClose={() => setRequestModalOpen(false)}
				powerPlantId={selectedPlantId}
				onSubmit={handleSubmit}
			/>

			{/* Update Request Modal */}
			<UpdateRequestStatusModal
				isOpen={isUpdateModalOpen}
				onClose={() => setUpdateModalOpen(false)}
				request={selectedRequest}
				onSubmit={handleRequestStatusUpdate}
			/>
		</div>
	);
};

export default Shortage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewPowerPlantModal from "../components/NewPowerPlant";
import UpdatePowerPlantModal from "../components/UpdatePowerPlant";
import powerPlant from "../assets/images/power-plant.jpg";

const PowerPlants = () => {
	const [newModalOpen, setNewModalOpen] = useState(false);
	const [updateModalOpen, setUpdateModalOpen] = useState(false);

	// useState to hold power plant data
	const [powerPlants, setPowerPlants] = useState([]);

	// useState to hold new power plant data
	const [newPlant, setNewPlant] = useState({
		name: "",
		location: "",
		ownership: "pub",
		daily_production_capacity: "",
		mail: "",
	});

	// useState to hold selected power plant data for updating
	const [selectedPlant, setSelectedPlant] = useState(null);

	// Fetch power plants
	useEffect(() => {
		axios
			.get("http://localhost:9090/powerplant/all")
			.then((response) => {
				setPowerPlants(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const fetchPowerPlants = () => {
		axios
			.get("http://localhost:9090/powerplant/all")
			.then((response) => {
				setPowerPlants(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleNewPlantChange = (e) => {
		const { name, value } = e.target;

		if (name === "daily_production_capacity") {
			const decimalValue = parseFloat(value);
			setNewPlant({ ...newPlant, [name]: decimalValue });
		} else {
			setNewPlant({ ...newPlant, [name]: value });
		}
	};

	const handleAddNew = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:9090/powerplant/add", newPlant)
			.then((response) => {
				fetchPowerPlants();
				window.alert("Power plant added successfully!");
			})
			.catch((error) => {
				console.log(error);
			});

		setNewModalOpen(false);
		setNewPlant({
			name: "",
			location: "",
			ownership: "pub",
			daily_production_capacity: "",
			mail: "",
		});
	};

	const handleUpdate = (plant) => {
		setUpdateModalOpen(true);
		setSelectedPlant(plant);
	};

	const handleSelectedPlantChange = (e) => {
		const { name, value } = e.target;

		if (name === "daily_production_capacity") {
			const decimalValue = parseFloat(value);
			setSelectedPlant((prev) => ({
				...prev,
				[name]: decimalValue,
			}));
			setNewPlant({ ...newPlant, [name]: decimalValue });
		} else {
			setSelectedPlant((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	// Submit updated data to backend
	const handleUpdateSubmit = (e) => {
		e.preventDefault();

		axios
			.put("http://localhost:9090/powerplant/update/", selectedPlant)
			.then((response) => {
				setPowerPlants((prevPlants) =>
					prevPlants.map((plant) =>
						plant.id === selectedPlant.id ? response.data : plant
					)
				);
				window.alert("Power plant updated successfully!");
				fetchPowerPlants();
				setUpdateModalOpen(false);
				setSelectedPlant(null);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleDelete = (selectedPlant) => {
		console.log(selectedPlant.id);
		axios
			.delete(`http://localhost:9090/powerplant/remove?id=${selectedPlant.id}`)
			.then(() => {
				fetchPowerPlants();
				window.alert("Power plant deleted successfully!");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow container mx-auto my-8">
				<div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center mx-auto max-w-md">
					<h1 className="text-4xl font-bold text-blue-800">Power Plants</h1>
				</div>
				<button
					onClick={() => setNewModalOpen(true)}
					className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mb-4"
				>
					Add New
				</button>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{powerPlants.map((plant, index) => (
						<div
							key={index}
							className="border rounded-lg overflow-hidden shadow-lg"
						>
							<img
								src={plant.image || powerPlant}
								alt={plant.name}
								className="w-full h-32 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-xl font-bold">{plant.name}</h2>
								<p>
									<strong>Location:</strong> {plant.location}
								</p>
								<p>
									<strong>Ownership:</strong>{" "}
									{plant.ownership === "pub" ? "Public" : "Private"}
								</p>
								<p>
									<strong>Daily Production Capacity:</strong>{" "}
									{plant.daily_production_capacity} GW
								</p>
								<p>
									<strong>Email:</strong> {plant.mail}
								</p>
								<div className="grid grid-cols-2 items-end">
									<button
										onClick={() => handleUpdate(plant)}
										className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4"
									>
										Update
									</button>
									<button
										onClick={() => {
											handleDelete(plant);
										}}
										className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-4"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<NewPowerPlantModal
					modalOpen={newModalOpen}
					setModalOpen={setNewModalOpen}
					handleSubmit={handleAddNew}
					newPlant={newPlant}
					handleChange={handleNewPlantChange}
				/>
				<UpdatePowerPlantModal
					modalOpen={updateModalOpen}
					setModalOpen={setUpdateModalOpen}
					handleSubmit={handleUpdateSubmit}
					updatePlant={selectedPlant || {}}
					handleChange={handleSelectedPlantChange}
				/>
			</main>
		</div>
	);
};

export default PowerPlants;

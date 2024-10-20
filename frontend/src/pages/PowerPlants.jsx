import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Model"; // Import the Modal component
import powerPlant from "../assets/images/power-plant.jpg"
const PowerPlants = () => {
	// useState to hold power plant data
	const [powerPlants, setPowerPlants] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [newPlant, setNewPlant] = useState({
		name: "",
		location: "",
		ownership: "government",
		daily_production_capacity: "",
		email: "",
	});

	useEffect(() => {
		axios
			.get("http://localhost:9090/powerplant/all")
			.then((response) => {
                setPowerPlants(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "daily_production_capacity") {
			const decimalValue = parseFloat(value);
			setNewPlant({ ...newPlant, [name]: decimalValue });
		} else {
			setNewPlant({ ...newPlant, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:9090/powerplant/add", newPlant)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		// setPowerPlants([...plants, newPlant]);
        powerPlants.push(newPlant);
		setModalOpen(false);
		setNewPlant({
			name: "",
			location: "",
			ownership: "",
			daily_production_capacity: "",
			email: "",
		});
	};

	return (
		<div className="flex flex-col min-h-screen">
			{" "}
			{/* Flexbox for layout */}
			<main className="flex-grow container mx-auto my-8">
				{" "}
				{/* Allow main to grow and push footer down */}
				{/* Card styled container for heading */}
				<div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center mx-auto max-w-md">
					<h1 className="text-4xl font-bold text-blue-800">Power Plants</h1>
				</div>
				<button
					onClick={() => setModalOpen(true)}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
				>
					Add New
				</button>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{powerPlants.map((plant) => (
						<div
							key={plant.id}
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
									<strong>Ownership:</strong> {plant.ownership}
								</p>
								<p>
									<strong>Daily Production Capacity:</strong>{" "}
									{plant.daily_production_capacity} MW
								</p>
								<p>
									<strong>Email:</strong> {plant.email}
								</p>
							</div>
						</div>
					))}
				</div>
				<Modal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					handleSubmit={handleSubmit}
					newPlant={newPlant}
					handleChange={handleChange}
				/>
			</main>
		</div>
	);
};

export default PowerPlants;

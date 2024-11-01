import React from "react";

const UpdatePowerPlantModal = ({
	modalOpen,
	setModalOpen,
	handleSubmit,
	updatePlant, // This will hold the data of the selected plant
	handleChange,
}) => {
	return (
		modalOpen && (
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
				<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform scale-95 hover:scale-100 w-full max-w-md">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Update Power Plant
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Name</label>
								<input
									type="text"
									name="name"
									value={updatePlant.name || ""}
									onChange={handleChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Location</label>
								<input
									type="text"
									name="location"
									value={updatePlant.location || ""}
									onChange={handleChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Ownership</label>
								<select
									name="ownership"
									value={updatePlant.ownership || ""}
									onChange={handleChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
								>
									<option value="pub">Government</option>
									<option value="private">Private</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Daily Production Capacity (MW)</label>
								<input
									type="number"
									name="daily_production_capacity"
									value={updatePlant.daily_production_capacity || ""}
									onChange={handleChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Email</label>
								<input
									type="email"
									name="mail"
									value={updatePlant.mail || ""}
									onChange={handleChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
								/>
							</div>
						</div>
						<div className="flex justify-between mt-6">
							<button
								type="submit"
								className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
							>
								Update Power Plant
							</button>
							<button
								type="button"
								onClick={() => setModalOpen(false)}
								className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default UpdatePowerPlantModal;
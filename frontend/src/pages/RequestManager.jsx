import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UpdateModal from "../components/updatemodel"; // Import the UpdateModal component

const RequestManager = () => {
    // Sample data for the table
    const [powerPlants, setPowerPlants] = useState([
        { id: 1, name: "Plant A", code: "PLT001", company: "Company A", description: "A description of Plant A", capacity: "100 MW" },
        { id: 2, name: "Plant B", code: "PLT002", company: "Company B", description: "A description of Plant B", capacity: "150 MW" },
        { id: 3, name: "Plant C", code: "PLT003", company: "Company C", description: "A description of Plant C", capacity: "200 MW" },
        { id: 4, name: "Plant D", code: "PLT004", company: "Company D", description: "A description of Plant D", capacity: "250 MW" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);

    const handleUpdateClick = (plant) => {
        setSelectedPlant(plant);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPlant(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Request Manager</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Power Plant Name</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Code</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold tracking-wider">Company</th>
                                <th className="py-3 px-6 text-center text-sm font-semibold tracking-wider">Update</th> {/* Align text to center */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-gradient-to-b from-white to-gray-100">
                            {powerPlants.map((plant) => (
                                <tr key={plant.id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                                    <td className="py-4 px-6 whitespace-nowrap">{plant.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">{plant.code}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">{plant.company}</td>
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
                <UpdateModal
                    plant={selectedPlant}
                    onClose={handleModalClose}
                />
            )}

            <Footer />
        </div>
    );
};

export default RequestManager;

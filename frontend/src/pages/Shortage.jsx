import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RequestModal from "../components/RequestModal";

const Shortage = () => {
    const [shortages, setShortages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlantId, setSelectedPlantId] = useState(null);
    const [shortageDates, setShortageDates] = useState(""); // State to hold possible shortage dates

    useEffect(() => {
        // Simulated data for shortages
        const dummyData = [
            { id: 1, name: "Plant A", capacity: "200 MW", description: "Expected power shortage due to maintenance." },
            { id: 2, name: "Plant B", capacity: "150 MW", description: "Potential shortage due to increased demand." },
            { id: 3, name: "Plant C", capacity: "300 MW", description: "Forecasted shortage due to fuel supply issues." },
        ];
        setShortages(dummyData);

        // Simulated fetching of possible shortage dates from a model or API
        const dummyShortageDates = "October 20, 2024 - November 15, 2024";
        setShortageDates(dummyShortageDates); // Set fetched dates to the state
    }, []);

    const handleRequest = (id) => {
        setSelectedPlantId(id); // Set the selected power plant ID
        setIsModalOpen(true); // Open the modal
    };

    const handleSubmit = (requestData) => {
        console.log("Request Data:", requestData);
        alert(`Request for Power Plant ID ${requestData.powerPlantId} submitted!`);
    };

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-grow p-6 bg-gray-100">
                {/* Display Possible Shortage Dates in a styled card */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg text-center">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Possible Shortage Dates</h1>
                        <p className="text-xl text-gray-700">{shortageDates}</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Private Power Plants</h2>

                {/* Shortage Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th> {/* Name Column */}
                                <th className="py-3 px-6 text-left">Capacity</th> {/* Capacity Column */}
                                <th className="py-3 px-6 text-left">Description</th> {/* Description Column */}
                                <th className="py-3 px-6 text-left text-center">Request</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {shortages.map((shortage) => (
                                <tr key={shortage.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{shortage.name}</td> {/* Display Name */}
                                    <td className="py-3 px-6">{shortage.capacity}</td> {/* Display Capacity */}
                                    <td className="py-3 px-6">{shortage.description}</td> {/* Display Description */}
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                                            onClick={() => handleRequest(shortage.id)}
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

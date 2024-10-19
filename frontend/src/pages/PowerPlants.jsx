import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Model"; // Import the Modal component

const PowerPlants = () => {
    // Dummy data for testing UI
    const dummyData = [
        {
            id: "PLT001",
            name: "Plant A",
            location: "Colombo",
            ownership: "Public",
            dailyProductionCapacity: 500,
            email: "contact@planta.com", // Dummy email
            image: "https://via.placeholder.com/150", // Placeholder image
        },
        {
            id: "PLT002",
            name: "Plant B",
            location: "Kandy",
            ownership: "Private",
            dailyProductionCapacity: 300,
            email: "info@plantb.com", // Dummy email
            image: "https://via.placeholder.com/150", // Placeholder image
        },
        {
            id: "PLT003",
            name: "Plant C",
            location: "Galle",
            ownership: "Public",
            dailyProductionCapacity: 400,
            email: "support@plantc.com", // Dummy email
            image: "https://via.placeholder.com/150", // Placeholder image
        },
        {
            id: "PLT004",
            name: "Plant D",
            location: "Jaffna",
            ownership: "Private",
            dailyProductionCapacity: 250,
            email: "contact@plantd.com", // Dummy email
            image: "https://via.placeholder.com/150", // Placeholder image
        },
    ];

    // State to hold power plant data
    const [plants, setPlants] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newPlant, setNewPlant] = useState({
        id: "",
        name: "",
        location: "",
        ownership: "",
        dailyProductionCapacity: "",
        email: "", // New email field
        image: null,
    });

    // Simulate fetching data from a database
    useEffect(() => {
        // Simulating an API call with dummy data
        setPlants(dummyData);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setNewPlant({ ...newPlant, [name]: files[0] });
        } else {
            setNewPlant({ ...newPlant, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle adding a new power plant to the database
        // For now, just logging to the console and closing the modal
        console.log("New Plant Added:", newPlant);
        setPlants([...plants, newPlant]); // Add new plant to state
        setModalOpen(false);
        setNewPlant({ id: "", name: "", location: "", ownership: "", dailyProductionCapacity: "", email: "", image: null }); // Reset form
    };

    return (
        <div className="flex flex-col min-h-screen"> {/* Flexbox for layout */}
            
            <main className="flex-grow container mx-auto my-8"> {/* Allow main to grow and push footer down */}
                <h1 className="text-3xl font-bold mb-4">Power Plants</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
                >
                    Add New
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {plants.map((plant) => (
                        <div key={plant.id} className="border rounded-lg overflow-hidden shadow-lg">
                            <img src={plant.image} alt={plant.name} className="w-full h-32 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{plant.name}</h2>
                                <p><strong>Location:</strong> {plant.location}</p>
                                <p><strong>Ownership:</strong> {plant.ownership}</p>
                                <p><strong>Daily Production Capacity:</strong> {plant.dailyProductionCapacity} MW</p>
                                <p><strong>Email:</strong> {plant.email}</p>
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

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditModal from "../components/EditModal"; // Import the new EditModal component

const PowerPlants = () => {
    const dummyData = [
        {
            id: "PLT001",
            name: "Plant A",
            location: "Colombo",
            ownership: "Public",
            dailyProductionCapacity: 500,
            email: "contact@planta.com",
            image: "https://via.placeholder.com/150",
        },
        {
            id: "PLT002",
            name: "Plant B",
            location: "Kandy",
            ownership: "Private",
            dailyProductionCapacity: 300,
            email: "info@plantb.com",
            image: "https://via.placeholder.com/150",
        },
        {
            id: "PLT003",
            name: "Plant C",
            location: "Galle",
            ownership: "Public",
            dailyProductionCapacity: 400,
            email: "support@plantc.com",
            image: "https://via.placeholder.com/150",
        },
        {
            id: "PLT004",
            name: "Plant D",
            location: "Jaffna",
            ownership: "Private",
            dailyProductionCapacity: 250,
            email: "contact@plantd.com",
            image: "https://via.placeholder.com/150",
        },
    ];

    const [plants, setPlants] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if we're updating or creating
    const [currentPlant, setCurrentPlant] = useState(null); // Track the plant being edited
    const [newPlant, setNewPlant] = useState({
        id: "",
        name: "",
        location: "",
        ownership: "",
        dailyProductionCapacity: "",
        email: "",
        image: null,
    });

    useEffect(() => {
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
        if (isEditing && currentPlant) {
            setPlants((prevPlants) =>
                prevPlants.map((plant) =>
                    plant.id === currentPlant.id ? newPlant : plant
                )
            );
        } else {
            setPlants([...plants, newPlant]);
        }
        setModalOpen(false);
        setIsEditing(false);
        setNewPlant({ id: "", name: "", location: "", ownership: "", dailyProductionCapacity: "", email: "", image: null });
    };

    const handleUpdateClick = (plant) => {
        setIsEditing(true);
        setCurrentPlant(plant);
        setNewPlant(plant); // Populate modal with plant's data
        setModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto my-8">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center mx-auto max-w-md">
                    <h1 className="text-4xl font-bold text-blue-800">Power Plants</h1>
                </div>
                <button
                    onClick={() => {
                        setModalOpen(true);
                        setIsEditing(false); // We're adding a new plant
                    }}
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

                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-blue-800 text-white px-4 py-2 rounded-md shadow hover:bg-blue-900 transition"
                                        onClick={() => handleUpdateClick(plant)}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="bg-red-700 text-white px-4 py-2 rounded-md shadow hover:bg-red-800 transition"
                                        onClick={() => handleDeleteClick(plant.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <EditModal
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

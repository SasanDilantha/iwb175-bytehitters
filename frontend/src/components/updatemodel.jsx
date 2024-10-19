import React, { useState } from 'react';

const UpdateModal = ({ plant, onClose }) => {
    const [description, setDescription] = useState(plant.description);
    const [capacity, setCapacity] = useState(plant.capacity);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to update the power plant details
        console.log(`Updated: ${plant.name}, Description: ${description}, Capacity: ${capacity}`);
        alert(`Updated details for ${plant.name}`);
        onClose(); // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Update Power Plant</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Capacity</label>
                            <input
                                type="text"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;

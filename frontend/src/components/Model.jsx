import React from 'react';

const Modal = ({ modalOpen, setModalOpen, handleSubmit, newPlant, handleChange }) => {
    return (
        modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform scale-95 hover:scale-100 w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Add New Power Plant</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={newPlant.id}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newPlant.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={newPlant.location}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Ownership */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ownership</label>
                                <input
                                    type="text"
                                    name="ownership"
                                    value={newPlant.ownership}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Daily Production Capacity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Daily Production Capacity (MW)</label>
                                <input
                                    type="number"
                                    name="dailyProductionCapacity"
                                    value={newPlant.dailyProductionCapacity}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newPlant.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            {/* Upload Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                                />
                                {newPlant.image && (
                                    <img
                                        src={URL.createObjectURL(newPlant.image)}
                                        alt="Preview"
                                        className="mt-4 mb-2 w-full h-auto rounded-lg"
                                    />
                                )}
                            </div>
                        </div>
                        {/* Buttons container */}
                        <div className="flex justify-between mt-6">
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                            >
                                Add Power Plant
                            </button>
                            <button
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

export default Modal;

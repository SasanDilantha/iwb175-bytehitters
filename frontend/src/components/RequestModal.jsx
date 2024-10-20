import React, { useState } from "react";

const RequestModal = ({ isOpen, onClose, powerPlantId, onSubmit }) => {
    const [requestData, setRequestData] = useState({
        powerPlantId: powerPlantId,
        requestAmount: "",
        date: new Date().toISOString().slice(0, 10), // Default to today's date
        status: "Not Approved",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData({ ...requestData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(requestData);
        console.log(requestData);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Submit Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Power Plant ID:</label>
                        <input
                            type="text"
                            name="powerPlantId"
                            value={powerPlantId}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Request Amount:</label>
                        <input
                            type="number"
                            name="requestAmount"
                            value={requestData.requestAmount}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={requestData.date}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700">Status:</label>
                        <select
                            name="status"
                            value={requestData.status}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Not Approved">Not Approved</option>
                            <option value="Approved">Approved</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 transition mr-2">
                            Submit
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestModal;

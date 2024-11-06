import React, { useState } from "react";

const UpdateRequestStatusModal = ({ isOpen, onClose, request, onSubmit }) => {
	const [status, setStatus] = useState("" || "Not Approved");

	if (!isOpen) return null;

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ ...request, status });
		onClose(); 
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold mb-4 text-center">
					Update Request Status
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Request ID: {request.id}
						</label>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Status:
							</label>
							<div className="flex items-center space-x-4">
								<label className="flex items-center">
									<input
										type="radio"
										name="status"
										value="Approved"
										checked={status === "Approved"}
										onChange={handleStatusChange}
										className="form-radio text-blue-500"
									/>
									<span className="ml-2">Approved</span>
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="status"
										value="Not Approved"
										checked={status === "Not Approved"}
										onChange={handleStatusChange}
										className="form-radio text-blue-500"
									/>
									<span className="ml-2">Not Approved</span>
								</label>
							</div>
						</div>
					</div>
					<div className="flex justify-end mt-6">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4 hover:bg-gray-400 transition"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
						>
							Update Status
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateRequestStatusModal;

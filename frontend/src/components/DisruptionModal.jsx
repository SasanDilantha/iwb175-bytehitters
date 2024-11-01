import axios from "axios";
import React, { useState } from "react";

const DisruptionModal = ({ plant, onClose }) => {
  console.log(plant);
  const [status, setStatus] = useState();
  const [capacity, setCapacity] = useState();

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:9090/powerplant/updateStatus", formData)
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });

    onClose();
  };

  const formData = {
    status: status,
    produceCapacity: parseFloat(capacity),
    plant_id: parseInt(plant.plant_id),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center ">
          Update Power Plant
        </h2>
        <form>
          <div className="space-y-4">
            <div className="form-group">
              <hidden name="plant_id" value={plant.plant_id} />
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 form-select"
                id="status"
                name="status"
                value={status}
                defaultValue={plant.status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="act">Active</option>
                <option value="pact">Partially Active</option>
                <option value="dct">Deactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current_Capacity
              </label>
              <input
                type="number"
                name="produce_capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                onClick={submitForm}
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

export default DisruptionModal;

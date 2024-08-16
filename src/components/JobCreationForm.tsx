import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { Transition } from "@headlessui/react";

const JobCreationForm: React.FC<{ onJobCreated: () => void }> = ({ onJobCreated }) => {
  const { walletAddress } = useWallet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !location || !salary || !walletAddress || !transactionHash) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          salary,
          employer: walletAddress,
          transactionHash,
        }),
      });

      if (response.ok) {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          onJobCreated(); // Hide the form
        }, 3000); // Hide tooltip after 3 seconds
      } else {
        setError("Failed to create job.");
      }
    } catch (error) {
      setError("An error occurred while creating the job.");
    }
  };

  return (
    <div className="relative">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create a Job</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Salary</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Employer Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Transaction Hash</label>
            <input
              type="text"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Create Job
          </button>
        </form>
      </div>

      {/* Tooltip */}
      <Transition
        show={showTooltip}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-2 right-2"
      >
        <div className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          Job created successfully!
        </div>
      </Transition>
    </div>
  );
};

export default JobCreationForm;

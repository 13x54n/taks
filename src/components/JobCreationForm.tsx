import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { Transition } from "@headlessui/react";

const JobCreationForm: React.FC<{ onJobCreated: () => void }> = ({ onJobCreated }) => {
  const { walletAddress } = useWallet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [eligibleForFlashLoans, setEligibleForFlashLoans] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!title || !description || !payment || !timestamp || !expiryTime || !transactionHash || !walletAddress) {
      setError("All fields are required.");
      return;
    }
  
    try {
      console.log("Submitting Job:", {
        title,
        description,
        employer: walletAddress,
        payment,
        timestamp,
        expiry_time: expiryTime,
        eligible_for_flash_loans: eligibleForFlashLoans,
        transaction_hash: transactionHash,
      });
  
      const response = await fetch("http://localhost:3001/api/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          employer: walletAddress,
          payment,
          timestamp,
          expiry_time: expiryTime,
          eligible_for_flash_loans: eligibleForFlashLoans,
          transaction_hash: transactionHash,
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
    <div className="relative max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Create a Job</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter job title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter job description"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Payment (Uint256)</label>
          <input
            type="text"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter payment amount"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Timestamp (Uint256)</label>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter current timestamp"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Expiry Time (Uint256)</label>
          <input
            type="text"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter expiry timestamp"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Transaction Hash</label>
          <input
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter transaction hash"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Eligible for Flash Loans</label>
          <input
            type="checkbox"
            checked={eligibleForFlashLoans}
            onChange={(e) => setEligibleForFlashLoans(e.target.checked)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Employer Wallet Address</label>
          <input
            type="text"
            value={walletAddress}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-black border font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Create Job
        </button>
      </form>

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
        <div className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          Job created successfully!
        </div>
      </Transition>
    </div>
  );
};

export default JobCreationForm;

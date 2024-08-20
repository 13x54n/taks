import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { motion } from 'framer-motion';

import { postJob } from "@/api/daoInteractions";

const JobCreationForm = ({ onJobCreated }) => {
  const { walletAddress } = useWallet(); // Get the wallet address of the logged-in user
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [eligibleForFlashLoans, setEligibleForFlashLoans] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Interact with the blockchain to create the job
      const hash = await postJob(title, description, payment);
      setTransactionHash(hash); // Save the transaction hash

      // Step 2: Save the job data to the database
      const response = await fetch('http://localhost:3001/api/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          payment,
          expiry_time: expiryTime,
          employer: walletAddress,
          is_filled: isFilled,
          eligible_for_flash_loans: eligibleForFlashLoans,
          transaction_hash: hash, // Use the blockchain transaction hash
        }),
      });

      if (response.ok) {
        alert('Job created successfully');
        onJobCreated(); // Close the form after job creation
      } else {
        alert('Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('An error occurred while creating the job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block text-sm font-bold mb-2">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Payment (in Wei)</label>
        <input
          type="number"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Expiry Time (timestamp)</label>
        <input
          type="number"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="block text-sm font-bold mb-2">Eligible for Flash Loans</label>
        <input
          type="checkbox"
          checked={eligibleForFlashLoans}
          onChange={(e) => setEligibleForFlashLoans(e.target.checked)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Transaction Hash</label>
        <input
          type="text"
          value={transactionHash}
          readOnly
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
      >
        {loading ? 'Creating...' : 'Create Job'}
      </motion.button>
    </motion.form>
  );
};

export default JobCreationForm;

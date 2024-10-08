import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { postJob } from "@/api/daoInteractions";
import { publicClient, address } from "@/utils/ViemConfig";
import { decodeEventLog } from 'viem';
import Web3JobPortalABI from '@/utils/Web3JobPortalCore.json';

interface JobCreationFormProps {
  onJobCreated: () => void;
}

const JobCreationForm = ({ onJobCreated }: JobCreationFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [eligibleForFlashLoans, setEligibleForFlashLoans] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const _address = await address();

      if (_address && _address.length > 0) {
        setUserAddress(_address);
      }
    })()
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Wallet not connected');
      return;
    }
    setLoading(true);

    try {
      // Step 1: Interact with the blockchain to create the job
      const txHash = await postJob(title, description, payment);
      setTransactionHash(txHash);

      // Step 2: Wait for the transaction to be mined and get the receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

      // Define the ABI for the JobPosted event
      const abiArray = Web3JobPortalABI.abi;

      // Find the specific event ABI in the ABI array
      const jobPostedEventAbi = abiArray.find(
        (item) => item.type === 'event' && item.name === 'JobPosted'
      );

      if (!jobPostedEventAbi) {
        throw new Error('JobPosted event ABI not found');
      }

      // Example log from the transaction receipt
      const log = receipt.logs[0]; // Ensure this references the correct log index

      // Decode the event log using the ABI from the JSON file
      const decodedJobPostedEvent: any = decodeEventLog({
        abi: [jobPostedEventAbi],
        data: log.data,
        topics: log.topics,
      });

      const jobId = decodedJobPostedEvent?.args.jobId.toString();

      // Step 3: Save the job data to the database
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
          employer: userAddress,
          eligible_for_flash_loans: eligibleForFlashLoans,
          transaction_hash: txHash,
          job_id: jobId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job in the database');
      }

      alert('Job created successfully');
      onJobCreated();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error creating job:', error);
      alert(`An error occurred while creating the job: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        disabled={loading || !userAddress}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
      >
        {loading ? 'Creating...' : 'Create Job'}
      </motion.button>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-md animate-bounce">
          Transaction completed in the Chain
        </div>
      )}
    </motion.form>
  );
};

export default JobCreationForm;

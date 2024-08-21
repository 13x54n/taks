import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { raiseDispute } from '@/api/daoInteractions';
import { address } from '@/utils/ViemConfig';

const EmployeeDashboard = () => {
  const { role } = useRole();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashLoanRequests, setFlashLoanRequests] = useState([]);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [disputeDescription, setDisputeDescription] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [disputesRaised, setDisputesRaised] = useState(new Set()); // Track raised disputes


  useEffect(() => {
    (async () => {
      const _address = await address();
      setWalletAddress(_address)
    })()
  })

  // Fetch jobs the employee has applied for
  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/employee-applications?employeeWalletAddress=${walletAddress}`);
      const data = await response.json();
      console.log(`Data : ${data}`)
      setAppliedJobs(data);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle flash loan request
  const handleFlashLoan = async (jobId, loanAmount) => {
    try {
      const response = await fetch(`http://localhost:3001/api/request-flash-loan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, employee: walletAddress, loanAmount }),
      });

      if (response.ok) {
        alert('Flash loan requested successfully');
        setFlashLoanRequests([...flashLoanRequests, jobId]);
      } else {
        alert('Failed to request flash loan');
      }
    } catch (error) {
      console.error('Error requesting flash loan:', error);
      alert('An error occurred while requesting the flash loan');
    }
  };

  const handleRaiseDispute = (job) => {
    setSelectedJob(job);
    setTransactionHash(''); // Reset the transaction hash field when opening the modal
    setShowDisputeModal(true);
  };

  const handleDisputeSubmit = async () => {
    if (!disputeDescription) {
      alert("Please enter a description for the dispute.");
      return;
    }
  
    const employerAddress = selectedJob?.employer;
    const isAgainstEmployer = true; 
  
    try {
      const transaction_hash = await raiseDispute(disputeDescription, employerAddress, isAgainstEmployer);
      setTransactionHash(transaction_hash); // Update the transaction hash with the actual value
      alert('Dispute raised successfully');
      
      // Close the modal and update the disputesRaised state
      setShowDisputeModal(false);
      setDisputesRaised(new Set(disputesRaised).add(selectedJob?.job_id)); // Mark this job as having a raised dispute

      // Show tooltip for 3 seconds
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } catch (error) {
      console.error('Error raising dispute:', error);
      alert('An error occurred while raising the dispute');
    }
  };

  useEffect(() => {
    if (role === 'Employee') {
      fetchAppliedJobs();
    }
  }, [walletAddress, role]);

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800 mt-20">Employee Dashboard</h1>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <motion.div
              key={job.job_id}
              className={`bg-white p-6 rounded-lg shadow-md mb-4 ${job.is_hired ? 'border-4 border-green-500' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p>{job.description}</p>
              <p>Payment: {job.payment}</p>
              <p>Employer: {job.employer}</p>
              <p>Employer: {job.eligible_for_flash_loans && "Enabled"}</p>
              <p className="mt-4 font-semibold">
                {job.is_hired ? 'You are hired for this job!' : 'Application Pending'}
              </p>
              {job.eligible_for_flash_loans && (
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                  onClick={() => handleFlashLoan(job.job_id, job.payment * 0.5)}
                  disabled={flashLoanRequests.includes(job.job_id)}
                >
                  {flashLoanRequests.includes(job.job_id) ? 'Flash Loan Requested' : 'Request Flash Loan'}
                </button>
              )}
              {job.is_hired && (
                <button
                  className={` ${disputesRaised.has(job.job_id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded-lg mt-4`}
                  onClick={() => handleRaiseDispute(job)}
                  disabled={disputesRaised.has(job.job_id)}
                >
                  {disputesRaised.has(job.job_id) ? 'Dispute already raised' : 'Raise Dispute'}
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <div>No jobs applied for</div>
        )}
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDisputeModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Raise Dispute</h2>
            <p><strong>Employer Address:</strong> {selectedJob?.employer}</p>
            <div className="mt-4">
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                value={disputeDescription}
                onChange={(e) => setDisputeDescription(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold mb-2">Transaction Hash</label>
              <input
                type="text"
                value={transactionHash}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                onClick={() => setShowDisputeModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                onClick={handleDisputeSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip Notification */}
      {showTooltip && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-md animate-bounce">
          Transaction completed in the Chain
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeDashboard;

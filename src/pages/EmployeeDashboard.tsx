import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRole } from '../context/RoleContext';

const EmployeeDashboard = () => {
  const walletAddress = "gfvghv "
  const { role } = useRole();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashLoanRequests, setFlashLoanRequests] = useState([]);

  // Fetch jobs the employee has applied for
  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/employee-applications?employeeWalletAddress=${walletAddress}`);
      const data = await response.json();
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
            </motion.div>
          ))
        ) : (
          <div>No jobs applied for</div>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;

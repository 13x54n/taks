import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { useWallet } from '../context/WalletContext';
import { useRole } from '../context/RoleContext';
import { motion } from 'framer-motion';
import JobCreationForm from '@/components/JobCreationForm';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const { walletAddress, setWalletAddress } = useWallet();
  const { role, setRole } = useRole();
  const [activeTab, setActiveTab] = useState('Jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);

  // Fetch jobs for the employer
  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const response = await fetch(`http://localhost:3001/api/employer-jobs?employerWalletAddress=${walletAddress}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch applications for the employer
  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      const response = await fetch(`http://localhost:3001/api/employer-applications?employerWalletAddress=${walletAddress}`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    } else {
      console.warn('No role found in local storage');
    }
  }, [setRole]);

  useEffect(() => {
    if (role === 'Employer') {
      fetchJobs();
      fetchApplications();
    }
  }, [walletAddress, role]);

  const handleJobCreated = () => {
    setShowJobForm(false);
    fetchJobs();
  };

  const handleLogout = () => {
    setWalletAddress('');
    setRole('');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userRole');
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

      {role === 'Employer' && (
        <div className="mb-8">
          <motion.p
            className="text-2xl font-semibold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Welcome, Employer
          </motion.p>
          <motion.button
            onClick={() => setShowJobForm(!showJobForm)}
            className="text-black font-bold py-3 px-6 rounded-lg hover:bg-black-600 transition duration-200 border"
            whileHover={{ scale: 1.05 }}
          >
            {showJobForm ? 'Hide Job Form' : 'Create Job'}
          </motion.button>

          {showJobForm && (
            <motion.div
              className="mt-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <JobCreationForm onJobCreated={handleJobCreated} />
            </motion.div>
          )}
        </div>
      )}

      <motion.button
        onClick={handleLogout}
        className="text-red-500 font-bold py-2 px-4 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition duration-200"
        whileHover={{ scale: 1.05 }}
      >
        Logout
      </motion.button>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b pb-2">
          <motion.button
            onClick={() => setActiveTab('Jobs')}
            className={`${
              activeTab === 'Jobs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Jobs
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('Applications')}
            className={`${
              activeTab === 'Applications' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Applications
          </motion.button>
        </div>
      </div>

      {/* Jobs Tab */}
      {activeTab === 'Jobs' && (
        <div>
          {loadingJobs ? (
            <div>Loading...</div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job.job_id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.description}</p>
                <p>Payment: {job.payment}</p>
                <p>Posted by: {job.employer}</p>
                <p>Transaction Hash: {job.transaction_hash}</p>
                <p className="font-semibold mt-4">Applications: {job.application_count}</p>
              </motion.div>
            ))
          ) : (
            <div>No jobs available</div>
          )}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'Applications' && (
        <div>
          {loadingApplications ? (
            <div>Loading...</div>
          ) : applications.length > 0 ? (
            applications.map((application) => (
              <motion.div
                key={application.application_id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold">{application.job_title}</h2>
                <p>Applicant: {application.employee_wallet_address}</p>
                <p>Cover Letter: {application.cover_letter}</p>
                {application.resume_link && (
                  <p>
                    Resume: <a href={application.resume_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <div>No applications available</div>
          )}
        </div>
      )}

      {/* Pie Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Pie
            data={{
              labels: ['Jobs Posted', 'Applications Received'],
              datasets: [
                {
                  data: [jobs.length, jobs.reduce((acc, job) => acc + job.application_count, 0)],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                  hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                },
              ],
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

interface JobApplicationFormProps {
  jobId: number;
  onApplicationSubmitted: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, onApplicationSubmitted }) => {
  const { walletAddress } = useWallet();
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!coverLetter) {
      setError('Cover letter is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          employeeWalletAddress: walletAddress,
          coverLetter,
          resumeLink,
        }),
      });

      if (response.ok) {
        setSuccess('Application submitted successfully!');
        onApplicationSubmitted();
      } else {
        setError('Failed to submit application. (job application form)');
      }
    } catch (error) {
      setError('An error occurred while submitting the application.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Cover Letter
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Resume Link (optional)
          </label>
          <input
            type="text"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;

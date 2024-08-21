import React, { useEffect, useState } from 'react';
import { applyForJob } from '@/api/daoInteractions';
import { address } from '@/utils/ViemConfig';

interface JobApplicationFormProps {
  jobId: string;
  onApplicationSubmitted: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, onApplicationSubmitted }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeId, setResumeId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    (async () => {
      const _address = await address();
      setWalletAddress(_address)
    })()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await applyForJob(jobId, coverLetter, resumeId);

      const response = await fetch('http://localhost:3001/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          applicant: walletAddress,
          resumeId,
          coverLetter: coverLetter || null, 
          timestamp: Math.floor(Date.now() / 1000), 
        }),
      });

      if (response.ok) {
        onApplicationSubmitted();
      } else {
        const errorData = await response.json();
        console.error('Application submission failed:', errorData);
        // Show error message to the user
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      // Show error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="resumeId" className="block text-sm font-medium text-gray-700">
          Resume ID
        </label>
        <input
          type="text"
          id="resumeId"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
          Cover Letter (Optional)
        </label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 text-white font-bold rounded-md ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default JobApplicationForm;

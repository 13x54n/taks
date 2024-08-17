import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';

interface JobApplicationFormProps {
  jobId: string;
  onApplicationSubmitted: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, onApplicationSubmitted }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { walletAddress } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          applicantAddress: walletAddress,
          coverLetter,
          bidAmount,
        }),
      });

      if (response.ok) {
        onApplicationSubmitted();
      } else {
        const errorData = await response.json();
        console.error('Application submission failed:', errorData);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
          Bid Amount (in ETH)
        </label>
        <input
          type="number"
          id="bidAmount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          step="0.01"
          min="0"
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
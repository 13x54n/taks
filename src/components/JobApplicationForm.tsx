import React, { useEffect, useState } from 'react';
import { applyForJob } from '@/api/daoInteractions';
import { address } from '@/utils/ViemConfig';
import lighthouse from '@lighthouse-web3/sdk'

interface JobApplicationFormProps {
  jobId: string;
  onApplicationSubmitted: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobId,
  onApplicationSubmitted,
}) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files);
  };

  const uploadFile = async (file:any) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(file, "1e604f0a.83d43b9f3289468b82c8b040da7661bc", null)
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */
   return output;
  }

  
  useEffect(() => {
    (async () => {
      const _address = await address();
      setWalletAddress(_address);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    try {
      if (!selectedFile) {
        return; // Prevent submission without a selected file
      }
const data = await uploadFile(selectedFile);

      await applyForJob(jobId, coverLetter, data.data.Hash); // Apply for job using resumeId

      const response = await fetch('http://localhost:3001/api/apply-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          applicant: walletAddress,
          resumeId: data.data.Hash,
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
          Resume
        </label>
        <input onChange={handleFileChange} type="file" />
      </div>
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
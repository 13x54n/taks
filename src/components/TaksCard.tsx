import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@/context/WalletContext";
import JobApplicationForm from "./JobApplicationForm"; // Import the form

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface TaksCardProps {
  jobId: string; // Use string instead of number for UUID
  title: string;
  description: string;
  creator: string;
  proposals: string;
  timePosted: string;
  tokenStake: string;
  transactionHash: string;
}

export default function TaksCard({
  jobId,
  title,
  description,
  creator,
  proposals,
  timePosted,
  tokenStake,
  transactionHash,
}: TaksCardProps) {
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { walletAddress, role } = useWallet();

  useEffect(() => {
    if (role === "Employee") {
      const checkApplicationStatus = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/has-applied/${jobId}/${walletAddress}`
          );
          const data = await response.json();
          setHasApplied(data.hasApplied);
        } catch (error) {
          console.error("Error checking application status:", error);
        }
      };

      checkApplicationStatus();
    }
  }, [jobId, walletAddress, role]);

  const handleApplicationSubmitted = () => {
    setOpen(false);
    setHasApplied(true);
  };

  return (
    <div
      className="my-4 border-b p-4 cursor-pointer transition-all ease-in-out hover:bg-gray-50"
      onClick={() => setOpen(true)}
    >
      <p className="text-sm font-semibold text-gray-500">
        Posted {formatDate(timePosted)}
      </p>
      <h1 className="text-lg font-semibold transition-all ease-in-out hover:text-[#7ED955]">
        {title}
      </h1>
      <p className="text-sm my-3">Expert - Est. Budget: {tokenStake}</p>
      <p>{description}</p>
      <ul className="flex flex-wrap my-3 gap-2">
        <li className="bg-gray-200 text-sm p-0.5 px-1 text-gray-700">Blockchain</li>
        <li className="bg-gray-200 text-sm p-0.5 px-1 text-gray-700">Ethereum</li>
      </ul>
      <div className="mt-2">
        <p className="text-gray-600">
          👷 <span className="text-gray-700 font-medium">Creator</span>: {creator}
        </p>
        <p className="text-gray-600">
          📜 <span className="text-gray-700 font-medium">Proposals</span>: {proposals}
        </p>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900 flex items-center justify-between">
                      <p>Task Details</p>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md focus:outline-none cursor-pointer focus:ring-2 focus:ring-white border-b-2 hover:border-gray-400 hover:bg-gray-200 transition-all ease-in-out bg-gray-50 text-xs py-1 p-2.5 pb-0"
                      >
                        ESC
                      </button>
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <p className="text-sm font-semibold text-gray-500">
                      Posted {formatDate(timePosted)}
                    </p>
                    <h1 className="text-lg font-semibold transition-all ease-in-out hover:text-[#7ED955] mt-4 leading-6">
                      {title}
                    </h1>
                    <p className="text-gray-600 mt-4">
                      👷 <span className="text-gray-700 font-medium">Creator</span>: {creator}
                    </p>

                    <p className="text-gray-600 mb-4">
                      📜 <span className="text-gray-700 font-medium">Proposals</span>: {proposals}
                    </p>
                    <hr />
                    <p className="mt-4 text-sm font-semibold text-gray-500">Description</p>
                    <p className="text-sm">
                      {description}
                    </p>

                    <p className="text-sm my-3 font-semibold text-gray-500">
                      Expert - Est. Budget: {tokenStake}
                    </p>
                    <p className="text-sm">✅ Payment Verified</p>
                    <p>Transaction Hash: {transactionHash}</p>

                    {role === "Employee" && (
                      <div className="mt-6">
                        {!hasApplied ? (
                          <button
                            onClick={() => setApplying(true)}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 w-full mb-2"
                          >
                            Apply Job
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 w-full mb-2"
                          >
                            Applied
                          </button>
                        )}

                        {applying && (
                          <JobApplicationForm
                            jobId={jobId} // Pass the jobId as a string
                            onApplicationSubmitted={handleApplicationSubmitted}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

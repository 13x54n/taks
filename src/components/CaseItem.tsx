import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "@heroicons/react/24/outline";
import { getAllDisputes } from "@/api/daoInteractions";

const CaseItem: React.FC<{ caseData: Case }> = ({ caseData }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(getAllDisputes());

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleVoteYes = () => {
    console.log(`Approved case: ${caseData.case_id}`);
    // Add your logic for approving the case
  };

  const handleVoteNo = () => {
    console.log(`Declined case: ${caseData.case_id}`);
    // Add your logic for declining the case
  };

  const isVoteDisabled = !caseData.is_current_user_juror;

  return (
    <div className="bg-white border-b-2 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{caseData.title}</h3>
        <button onClick={handleToggle} className="text-green-500">
          {/* {isOpen ? "Collapse" : "Expand"} */}
          {isOpen ? (
            <MinusIcon className="h-6 w-6" />
          ) : (
            <PlusIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>Status:</strong> {caseData.status}
              </p>
              <p>
                <strong>Outcome:</strong> {caseData.outcome}
              </p>
              <p>
                <strong>Juror Count:</strong> {caseData.juror_count}
              </p>
              <p>
                <strong>Expiry Time:</strong>{" "}
                {new Date(caseData.expiry_time).toLocaleString()}
              </p>
              <p>
                <strong>Evidence:</strong> {caseData.ipfs_hash.slice(0, 6)}...
                {caseData.ipfs_hash.slice(-6)}
              </p>
            </div>
            <div>
              <p>
                <strong>Votes:</strong>
              </p>
              <p>Yes: {caseData.votes?.yes}</p>
              <p>No: {caseData.votes?.no}</p>
              <p>Pending: {caseData.votes?.pending}</p>
              <p>Total: {caseData.votes?.total_votes}</p>
            </div>
          </div>
          {!caseData.is_current_user_juror ? (
            <p className="text-sm text-gray-500 mt-2">
              You are not a juror for this case. Voting is disabled.
            </p>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleVoteYes}
                disabled={isVoteDisabled}
                className={`px-4 py-2 rounded ${
                  isVoteDisabled
                    ? "bg-gray-300"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Vote Yes
              </button>
              <button
                onClick={handleVoteNo}
                disabled={isVoteDisabled}
                className={`px-4 py-2 rounded ${
                  isVoteDisabled
                    ? "bg-gray-300"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                Vote No
              </button>
            </div>
          )}

          {/* {!caseData.is_current_user_juror && (
            <p className="text-sm text-gray-500 mt-2">
              You are not a juror for this case. Voting is disabled.
            </p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default CaseItem;

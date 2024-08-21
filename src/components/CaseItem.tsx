import React, { useEffect, useState, useRef, memo } from "react";
import { getAllDisputes } from "@/api/daoInteractions";

const CaseItem = memo(() => {
  const [disputes, setDisputes] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const disputesData = await getAllDisputes();
        console.log("DisputesData:", disputesData);
        setDisputes(disputesData);
      } catch (error) {
        console.error("Failed to fetch disputes(caseItem.tsx):", error);
      }
    };

    if (!fetchedRef.current) {
      fetchDisputes();
      fetchedRef.current = true;
    }
  }, []);

  if (!disputes.length) {
    return <p className="text-gray-500 text-center">No disputes found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {disputes.map((dispute, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 mb-4 transition duration-500 hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Dispute ID: {dispute.disputeId.toString()}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span> {dispute.description}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Initiator:</span> {dispute.initiator}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Target:</span> {dispute.target}
          </p>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Vote
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
            >
              Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default CaseItem;

import React from "react";
import { TrophyIcon } from "@heroicons/react/24/outline";

const RewardCard: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-green-400 text-white rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <div className="bg-green-600 p-4 rounded-xl">
          <TrophyIcon aria-hidden="true" className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <div className="text-md font-semibold text-gray-100">Coherence</div>
          <div className="text-4xl font-bold">Rewards</div>
        </div>
      </div>
      <div className="flex space-x-8">
        <div className="text-center">
          <div className="text-md font-semibold text-gray-100">Total</div>
          <div className="text-4xl font-bold">0.000 ETH</div>
        </div>
        <div className="text-center">
          <div className="text-md font-semibold text-gray-100">Total</div>
          <div className="text-4xl font-bold">0 PNK</div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;

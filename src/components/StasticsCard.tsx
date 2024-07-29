// src/components/StatisticCard.js
import React from "react";

const StatisticCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg p-6 m-4 w-64 shadow-sm ">
      <h3 className="text-gray-700 text-lg font-semibold">{title}</h3>
      <p className="text-gray-900 text-xl mt-2">{value}</p>
    </div>
  );
};

export default StatisticCard;

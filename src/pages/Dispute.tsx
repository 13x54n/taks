import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScaleIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

const Dispute = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  const navigate = useNavigate();

  const disputes = [
    {
      id: 1,
      title: "DApp security audit",
      category: "Security",
      timePosted: "1 hour ago",
      creator: "0x5a6f...c45D",
      status: "Open",
      proposals: 3,
      tokenStake: "500 USDC",
      description: "A detailed security audit of a decentralized application built on the Polygon network.",
    },
    {
      id: 2,
      title: "Tokenomics consultation",
      category: "Consultation",
      timePosted: "2 hours ago",
      creator: "0x6b89...dEf7",
      status: "Open",
      proposals: 7,
      tokenStake: "300 USDC",
      description: "Consultation on designing tokenomics for a new DeFi project.",
    },
    {
      id: 3,
      title: "Smart contract audit",
      category: "Audit",
      timePosted: "2 days ago",
      creator: "0x3b57...7AeE",
      status: "Resolved",
      proposals: 5,
      tokenStake: "1500 USDC",
      description: "An audit of a DeFi smart contract to ensure it is free of vulnerabilities.",
    },
    {
      id: 4,
      title: "NFT marketplace development",
      category: "Development",
      timePosted: "3 hours ago",
      creator: "0x9b6e...dFf9",
      status: "Open",
      proposals: 12,
      tokenStake: "2000 USDC",
      description: "Development of a custom NFT marketplace with bidding and auction functionalities.",
    },
  ];

  const categories = ["All", "Security", "Consultation", "Audit", "Development"];

  const sortedDisputes = [...disputes].sort((a, b) => {
    if (sortOption === "Newest") {
      return new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime();
    } else if (sortOption === "Oldest") {
      return new Date(a.timePosted).getTime() - new Date(b.timePosted).getTime();
    } else if (sortOption === "Most Proposals") {
      return b.proposals - a.proposals;
    } else {
      return a.proposals - b.proposals;
    }
  });

  const filteredDisputes =
    selectedCategory === "All"
      ? sortedDisputes
      : sortedDisputes.filter((dispute) => dispute.category === selectedCategory);

  const handleDisputeClick = (id) => {
    navigate(`/dispute/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Disputes</h1>

      <div className="flex justify-between items-center mb-8">
        {/* Category Filter */}
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg border-2 ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } hover:bg-gray-800 hover:text-white transition duration-150`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium"
          >
            <option value="Newest">Sort by: Newest</option>
            <option value="Oldest">Sort by: Oldest</option>
            <option value="Most Proposals">Sort by: Most Proposals</option>
            <option value="Fewest Proposals">Sort by: Fewest Proposals</option>
          </select>
        </div>
      </div>

      {/* Dispute List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDisputes.map((dispute) => (
          <div
            key={dispute.id}
            className="p-6 border rounded-lg shadow-lg bg-white space-y-4"
          >
            <div className="flex items-center space-x-4">
              <ScaleIcon
                className={`h-10 w-10 ${
                  dispute.status === "Resolved" ? "text-gray-700" : "text-black"
                }`}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{dispute.title}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span>Posted {dispute.timePosted}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span>Creator: {dispute.creator}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-gray-400" />
                  <span>Proposals: {dispute.proposals}</span>
                </div>
                <span
                  className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    dispute.status === "Resolved"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {dispute.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleDisputeClick(dispute.id)}
              className="w-full flex justify-between items-center px-4 py-2 rounded-lg border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition duration-150"
            >
              <span>Resolve Dispute</span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dispute;

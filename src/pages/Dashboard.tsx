import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Transition } from "@headlessui/react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"Past" | "Current" | "Resolved">(
    "Current"
  );

  const pastDisputes = [
    {
      title: "Consultation with an expert in blockchain",
      timePosted: "24 minutes ago",
      creator: "0x6a68...8DfF",
      proposals: "Less than 5",
      description:
        "I have got a script which buys and sells tokens using Solana Jito Bundle. I need to update this script to buy/sell tokens with different wallets each time.",
      tokenStake: "200 USDC",
      paymentVerified: true,
      transactionHash: "0x45gh4532jjku...09i",
    },
    {
      title: "Smart contract audit",
      timePosted: "2 days ago",
      creator: "0x3b57...7AeE",
      proposals: "5 to 10",
      description:
        "Looking for an audit of a DeFi smart contract. The contract is around 800 lines and needs a thorough review.",
      tokenStake: "400 USDC",
      paymentVerified: true,
      transactionHash: "0x89khd452jkl...89e",
    },
    {
      title: "Full-stack blockchain development",
      timePosted: "3 days ago",
      creator: "0x9c8a...b78A",
      proposals: "10 to 20",
      description:
        "Need a full-stack developer for building a dApp on Ethereum. The project involves setting up a smart contract and a user-friendly frontend.",
      tokenStake: "600 USDC",
      paymentVerified: false,
      transactionHash: "0x7bjr5dh453h...0gh",
    },
    {
      title: "NFT minting script",
      timePosted: "5 days ago",
      creator: "0x4d1e...3cFa",
      proposals: "Less than 5",
      description:
        "Need a script to mint NFTs in bulk. The script should handle various ERC-721 standards and be optimized for gas efficiency.",
      tokenStake: "300 USDC",
      paymentVerified: true,
      transactionHash: "0x94fhd53k55j...2lf",
    },
  ];

  const currentDisputes = [
    {
      title: "DApp security audit",
      timePosted: "1 hour ago",
      creator: "0x5a6f...c45D",
      proposals: "Less than 5",
      description:
        "Audit a decentralized application built on Polygon. Focus on security loopholes and gas optimization.",
      tokenStake: "500 USDC",
      paymentVerified: true,
      transactionHash: "0xa45dfd342kl...67g",
    },
    {
      title: "Tokenomics consultation",
      timePosted: "2 hours ago",
      creator: "0x6b89...dEf7",
      proposals: "5 to 10",
      description:
        "Consultation needed for tokenomics design of a new DeFi protocol. Must have experience in economic modeling and simulation.",
      tokenStake: "300 USDC",
      paymentVerified: false,
      transactionHash: "0xb34fjd554kl...78h",
    },
    {
      title: "DEX integration",
      timePosted: "3 hours ago",
      creator: "0x8d6a...aBcE",
      proposals: "10 to 20",
      description:
        "Integrate a DEX into our existing platform. The integration should support multiple pairs and provide a seamless user experience.",
      tokenStake: "800 USDC",
      paymentVerified: true,
      transactionHash: "0xc78gf435klf...89j",
    },
    {
      title: "NFT marketplace development",
      timePosted: "4 hours ago",
      creator: "0x9b6e...dFf9",
      proposals: "20 to 30",
      description:
        "Develop a custom NFT marketplace. Features include auctions, bidding, and lazy minting. The UI should be responsive and user-friendly.",
      tokenStake: "1200 USDC",
      paymentVerified: false,
      transactionHash: "0xd56gdf43kld...90k",
    },
    {
      title: "Blockchain data analytics tool",
      timePosted: "6 hours ago",
      creator: "0x2a4c...fG7Y",
      proposals: "10 to 20",
      description:
        "Build a tool to analyze blockchain data. The tool should be able to extract, process, and visualize data from multiple chains.",
      tokenStake: "900 USDC",
      paymentVerified: true,
      transactionHash: "0xe56gf453klm...12l",
    },
    {
      title: "Smart contract upgrade",
      timePosted: "7 hours ago",
      creator: "0x1b3a...cHd9",
      proposals: "5 to 10",
      description:
        "Upgrade an existing smart contract to add new functionalities. The contract is currently live, so care must be taken to avoid disruptions.",
      tokenStake: "700 USDC",
      paymentVerified: true,
      transactionHash: "0xf23gf563klm...23m",
    },
    {
      title: "DAO governance setup",
      timePosted: "8 hours ago",
      creator: "0x7d5f...gH7Y",
      proposals: "10 to 20",
      description:
        "Help set up governance for a new DAO. The project involves creating a governance token and integrating voting mechanisms.",
      tokenStake: "1000 USDC",
      paymentVerified: false,
      transactionHash: "0xa23gf453klm...34n",
    },
    {
      title: "Blockchain game development",
      timePosted: "10 hours ago",
      creator: "0x3c7d...vH7Y",
      proposals: "20 to 30",
      description:
        "Develop a play-to-earn blockchain game. The game should include NFT integration and a token-based economy.",
      tokenStake: "1500 USDC",
      paymentVerified: true,
      transactionHash: "0xb23gf453klm...45o",
    },
  ];

  const resolvedDisputes = [
    {
      title: "Layer 2 scaling solution consultation",
      timePosted: "2 days ago",
      creator: "0x4a7b...6EfF",
      proposals: "5 to 10",
      description:
        "Need expert advice on Layer 2 scaling solutions for Ethereum. Focus on zk-Rollups vs. Optimistic Rollups.",
      tokenStake: "600 USDC",
      paymentVerified: true,
      transactionHash: "0xd57gf654klm...45p",
    },
    {
      title: "DeFi strategy review",
      timePosted: "5 days ago",
      creator: "0x5b9c...7GgF",
      proposals: "10 to 20",
      description:
        "Looking for a strategic review of our DeFi platform. Includes yield farming strategies, liquidity management, and risk assessment.",
      tokenStake: "1200 USDC",
      paymentVerified: true,
      transactionHash: "0xe78hf765klm...56q",
    },
  ];

  const data = {
    labels: ["Past Disputes", "Current Disputes", "Resolved Disputes"],
    datasets: [
      {
        data: [pastDisputes.length, currentDisputes.length, resolvedDisputes.length],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  const successRate = Math.round(
    (resolvedDisputes.length / (resolvedDisputes.length + pastDisputes.length + currentDisputes.length)) * 100
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("Current")}
            className={`pb-2 ${
              activeTab === "Current"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Current Disputes
          </button>
          <button
            onClick={() => setActiveTab("Past")}
            className={`pb-2 ${
              activeTab === "Past"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Past Disputes
          </button>
          <button
            onClick={() => setActiveTab("Resolved")}
            className={`pb-2 ${
              activeTab === "Resolved"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Resolved Disputes
          </button>
        </div>

        <Transition
          show={activeTab === "Current"}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDisputes.map((dispute, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition bg-white"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {dispute.title}
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                  Posted {dispute.timePosted} by{" "}
                  <span className="text-gray-600">{dispute.creator}</span>
                </p>
                <p className="text-gray-700 mb-4">{dispute.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Proposals: {dispute.proposals}
                  </span>
                  <span className="text-sm text-gray-600">
                    Token Stake: {dispute.tokenStake}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      dispute.paymentVerified
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {dispute.paymentVerified
                      ? "✅ Payment Verified"
                      : "❌ Payment Not Verified"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Txn Hash: {dispute.transactionHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Transition>

        <Transition
          show={activeTab === "Past"}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastDisputes.map((dispute, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition bg-white"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {dispute.title}
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                  Posted {dispute.timePosted} by{" "}
                  <span className="text-gray-600">{dispute.creator}</span>
                </p>
                <p className="text-gray-700 mb-4">{dispute.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Proposals: {dispute.proposals}
                  </span>
                  <span className="text-sm text-gray-600">
                    Token Stake: {dispute.tokenStake}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      dispute.paymentVerified
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {dispute.paymentVerified
                      ? "✅ Payment Verified"
                      : "❌ Payment Not Verified"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Txn Hash: {dispute.transactionHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Transition>

        <Transition
          show={activeTab === "Resolved"}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedDisputes.map((dispute, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition bg-white"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {dispute.title}
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                  Posted {dispute.timePosted} by{" "}
                  <span className="text-gray-600">{dispute.creator}</span>
                </p>
                <p className="text-gray-700 mb-4">{dispute.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Proposals: {dispute.proposals}
                  </span>
                  <span className="text-sm text-gray-600">
                    Token Stake: {dispute.tokenStake}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      dispute.paymentVerified
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {dispute.paymentVerified
                      ? "✅ Payment Verified"
                      : "❌ Payment Not Verified"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Txn Hash: {dispute.transactionHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Transition>
      </div>


      {/* Pie Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Disputes Overview</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Pie data={data} />
        </div>
      </div>

      {/* Success Rate */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Success Rate</h2>
        <div className="bg-blue-100 text-blue-700 p-4 rounded-lg shadow-md">
          <p className="text-xl">
            Based on resolved disputes, your success rate is{" "}
            <span className="font-bold">{successRate}%</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

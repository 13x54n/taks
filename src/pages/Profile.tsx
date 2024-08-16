import React from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserIcon,
  TrophyIcon,
  AcademicCapIcon,
  ScaleIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { useWallet } from "../context/WalletContext";

const Profile = () => {
  const { walletAddress, role } = useWallet();
  console.log(`Role: ${role}`)
  const isVerified = true; // Set to true if the user is verified
  const badges = ["Early Adopter", "Contributor", "Top Voter"];
  const reputationRank = "Expert"; // Example rank
  const certifications = [
    "Certified Smart Contract Developer",
    "Blockchain Security Auditor",
  ];

  const pastDisputes = [
    {
      title: "Consultation with an expert in blockchain",
      status: "Resolved",
    },
    {
      title: "Smart contract audit",
      status: "Resolved",
    },
  ];

  const currentDisputes = [
    {
      title: "DApp security audit",
      status: "Open",
    },
    {
      title: "Tokenomics consultation",
      status: "Open",
    },
  ];

  const getVerifiedText = () => {
    switch (role) {
      case "Employee":
        // return "Verified Employee";
        return " Employee";
      case "Employer":
        // return "Verified Employer";
        return " Employer";
      case "Judiciary":
        // return "Verified Judiciary";
        return " Judiciary";
      default:
        // return "Verified User";
        return " User";
    }
  };

  const renderProfileContent = () => {
    switch (role) {
      case "Employee":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold">Employee Dashboard</h2>
            <p>Welcome, valued employee! Here are your tasks and benefits.</p>
            {/* Add more specific content for Employee role */}
          </div>
        );
      case "Employer":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold">Employer Dashboard</h2>
            <p>Welcome, employer! Manage your teams and projects here.</p>
            {/* Add more specific content for Employer role */}
          </div>
        );
      case "Judiciary":
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold">Judiciary Dashboard</h2>
            <p>Welcome, judiciary! Review and resolve disputes here.</p>
            {/* Add more specific content for Judiciary role */}
          </div>
        );
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h2 className="text-2xl font-semibold">User Dashboard</h2>
            <p>Welcome to your dashboard. Please complete your profile.</p>
            {/* Add more generic content */}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
        {/* Wallet Address & Verification Status */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-4">
            <UserIcon className="h-12 w-12 text-indigo-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Wallet Address
              </h2>
              <p className="text-lg text-gray-700">{walletAddress}</p>
            </div>
          </div>
          <div className="flex items-center">
            {isVerified ? (
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="h-8 w-8 text-red-500" />
            )}
            <span className="ml-2 text-lg text-gray-700">
              {isVerified ? getVerifiedText() : "Not Verified"}
            </span>
          </div>
        </div>

        {renderProfileContent()}

        {/* Badges, Reputation Rank, and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Badges</h3>
            <div className="flex flex-wrap">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mr-3 mb-3"
                >
                  <TrophyIcon className="h-6 w-6 mr-2 text-blue-500" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Reputation Rank
            </h3>
            <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-lg">
              <FireIcon className="h-6 w-6 mr-2 text-green-500" />
              <span className="text-lg font-medium">{reputationRank}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Certifications
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="text-sm flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2 text-indigo-600" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disputes Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Current Disputes
            </h3>
            <div className="space-y-4">
              {currentDisputes.map((dispute, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center"
                >
                  <ScaleIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {dispute.title}
                    </h4>
                    <span className="text-sm text-blue-600">
                      {dispute.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Past Disputes
            </h3>
            <div className="space-y-4">
              {pastDisputes.map((dispute, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center"
                >
                  <ScaleIcon className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {dispute.title}
                    </h4>
                    <span className="text-sm text-green-600">
                      {dispute.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

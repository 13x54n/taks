import React from "react";
import {
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  HeartIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const Awards = () => {
  const awards = [
    {
      id: 1,
      title: "Top Contributor",
      description: "Awarded for outstanding contributions to the community.",
      icon: TrophyIcon,
    },
    {
      id: 2,
      title: "Excellence in Innovation",
      description: "Recognized for innovative solutions in the DeFi space.",
      icon: StarIcon,
    },
    {
      id: 3,
      title: "Certified Expert",
      description: "Certified expert in blockchain development and security.",
      icon: AcademicCapIcon,
    },
    {
      id: 4,
      title: "Community Hero",
      description: "Awarded for exceptional support and guidance in the community.",
      icon: CheckCircleIcon,
    },
    {
      id: 5,
      title: "Philanthropist",
      description: "Honored for contributions to charitable causes using blockchain.",
      icon: HeartIcon,
    },
    {
      id: 6,
      title: "Global Impact",
      description: "Recognized for projects that have a global reach and impact.",
      icon: GlobeAltIcon,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-16">Achievements</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {awards.map((award) => (
          <div
            key={award.id}
            className="relative p-8 border rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="absolute -top-1 -right-0 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <award.icon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-8">{award.title}</h2>
            <p className="text-gray-600 mt-4">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;

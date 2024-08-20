import React from "react";

interface CardContainerProps {
  title: string;
  icon?: JSX.Element;
  children: React.ReactNode;
}

const DashCard: React.FC<CardContainerProps> = ({ title, icon, children }) => {
  return (
    <div className="mt-8 text-green-800 rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-4 flex items-center justify-between bg-green-100">
        <div className="flex items-center">
          {icon && (
            <div className="text-3xl text-green-700 p-2 rounded-md">{icon}</div>
          )}
          <div className="ml-4">
            <div className="text-2xl font-bold">{title}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg text-black font-semibold p-4">
        {children}
      </div>
    </div>
  );
};

export default DashCard;

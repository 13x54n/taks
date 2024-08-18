/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RoleContextProps {
  role: string;
  fetchUserRole: (walletAddress: string) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string>("");

  const fetchUserRole = async (walletAddress: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/get-role?walletAddress=${walletAddress}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.role) {
          setRole(data.role);
        }
      } else {
        console.error("Failed to fetch role");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  return (
    <RoleContext.Provider value={{ role, fetchUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

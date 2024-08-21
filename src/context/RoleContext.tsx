/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RoleContextProps {
  role: string;
  setRole: (role: string) => void;
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
  const [role, setRole] = useState<string>(() => {
    return localStorage.getItem("userRole") || "";
  });

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

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("walletAddress");
    
    if (role && isUserLoggedIn) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole, fetchUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};

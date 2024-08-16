import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextProps {
  walletAddress: string;
  role: string;
  setWalletAddress: (address: string) => void;
  setRole: (role: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider: React.FC = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (walletAddress) {
      fetchUserRole(walletAddress);
    }
  }, [walletAddress]);

  const fetchUserRole = async (address: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/get-role?walletAddress=${address}`);
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
    <WalletContext.Provider value={{ walletAddress, role, setWalletAddress, setRole }}>
      {children}
    </WalletContext.Provider>
  );
};

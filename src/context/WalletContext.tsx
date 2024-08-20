/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WalletContextProps {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string>(() => {
    return localStorage.getItem("walletAddress") || "";
  });

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
    } else {
      localStorage.removeItem("walletAddress");
    }
  }, [walletAddress]);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

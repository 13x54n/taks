import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { NavLink } from "react-router-dom";
import { UserCircleIcon,} from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";
import { useWallet } from "../context/WalletContext";
import { useRole } from "../context/RoleContext";
import RoleSelectionModal from "./ui/RoleSelectionModel";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

export default function Navbar() {
  const { walletAddress, setWalletAddress } = useWallet();
  const { role, setRole, fetchUserRole } = useRole();
  const [balance, setBalance] = useState<string>("");
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      getBalance(walletAddress);
      fetchUserRole(walletAddress);

      const storedRole = localStorage.getItem("userRole");
      if (!storedRole) {
        setRoleModalOpen(true);
      } else {
        setRole(storedRole);
      }
    }
  }, [walletAddress]);

  const connectWallet = async (): Promise<void> => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (Array.isArray(accounts) && typeof accounts[0] === 'string') {
          setWalletAddress(accounts[0]);
        } else {
          throw new Error("Unexpected response format");
        }
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const getBalance = async (address: string) => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(parseFloat(balance).toFixed(4)); // Format balance to 4 decimal places
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    setRoleModalOpen(false);
  };

  const closeRoleModal = () => {
    setRoleModalOpen(false);
  };

  return (
    <header className="bg-white border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Left - Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img alt="Logo" src={Logo} className="h-6 w-auto" />
          </NavLink>
        </div>

        {/* Center - Navigation Links */}
        <div className=" lg:flex lg:gap-x-12">
          <NavLink to="/home" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </NavLink>
          <NavLink to="/disputes" className="text-sm font-semibold leading-6 text-gray-900">
            Dispute
          </NavLink>
          <NavLink to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </NavLink>
          <NavLink to="/awards" className="text-sm font-semibold leading-6 text-gray-900">
            Awards
          </NavLink>
          <NavLink to="/profile" className="text-sm font-semibold leading-6 text-gray-900">
            Profile
          </NavLink>
        </div>

        {/* Right - Wallet Connection */}
        <div className=" lg:flex lg:flex-1 lg:justify-end">
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                ({balance} ETH)
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-[#7DD956]"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Role Selection Modal */}
      {isRoleModalOpen && (
        <RoleSelectionModal
          onSelectRole={handleRoleSelect}
          onClose={closeRoleModal}
          walletAddress={walletAddress}
        />
      )}
    </header>
  );
}

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";
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
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { role, setRole, fetchUserRole } = useRole();
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const isWalletConnected: any = localStorage.getItem("walletAddress") || "";
    setWalletAddress(isWalletConnected);
    
      if (isWalletConnected.length > 0) {
        fetchUserRole(isWalletConnected);
  
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
          setRole(storedRole);
        }
      }
  }, []);

  const connectWallet = async (): Promise<void> => {
    const address: any = window.ethereum &&
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      localStorage.setItem("walletAddress", address[0])
      setWalletAddress(address[0])

      fetchUserRole(address[0]);
  
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
          setRole(storedRole);
        }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    setRoleModalOpen(false);
    setTooltip(null);
  };

  const closeRoleModal = () => {
    setRoleModalOpen(false);
  };

  const handleSelectRoleClick = () => {
    if (role) {
      setTooltip(`Role "${role}" has already been assigned.`);
      setTimeout(() => setTooltip(null), 2000);
    } else {
      setRoleModalOpen(true);
    }
    setDropdownOpen(false);
  };

  const logout = () => {
    setWalletAddress("");
    setRole("");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("userRole");
    setDropdownOpen(false);
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
        <div className="hidden lg:flex lg:gap-x-8">
          <NavLink to="/disputes" className="text-sm font-semibold leading-6 text-gray-900">
            Dispute
          </NavLink>
          <NavLink to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </NavLink>
          <NavLink to="/awards" className="text-sm font-semibold leading-6 text-gray-900">
            Awards
          </NavLink>
          {
            role === "Employee" && <NavLink to="/flash-loan" className="text-sm font-semibold leading-6 text-gray-900">
            Flash Loan
          </NavLink>
          }
        </div>

        {/* Right - Wallet Connection */}
        <div className="lg:flex lg:flex-1 lg:justify-end relative">
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <ChevronDownIcon
                className="h-5 w-5 text-gray-900 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-32 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleSelectRoleClick}
                    className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
                  >
                    Select Role
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
              {tooltip && (
                <div className="absolute right-0 mt-2 bg-yellow-500 text-white text-sm px-4 py-2 rounded-md shadow-lg">
                  {tooltip}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => connectWallet()}
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

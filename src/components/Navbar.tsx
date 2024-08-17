import { useState, useEffect } from "react";
<<<<<<< HEAD
import { BrowserProvider, formatEther } from "ethers";
import { useNavigate, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import RoleSelectionModal from "./ui/RoleSelectionModel";
=======
import { BrowserProvider } from "ethers";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
import Logo from "../../public/logo.png";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: unknown[]) => void
      ) => void;
    };
  }
}

// Add global declaration for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    const savedRole = localStorage.getItem("userRole");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, [setWalletAddress, setRole]);

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
      getBalance(walletAddress);
    } else {
      localStorage.removeItem("walletAddress");
    }
  }, [walletAddress]);

  useEffect(() => {
    // connectWallet();
  }, []);

  const connectWallet = async (): Promise<void> => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
<<<<<<< HEAD
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsRoleModalOpen(true);
=======
        const accounts = await provider.send("eth_requestAccounts", []);
        if (Array.isArray(accounts) && typeof accounts[0] === "string") {
          setWalletAddress(accounts[0]);
        } else {
          throw new Error("Unexpected response format");
        }
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
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
<<<<<<< HEAD
        const provider = new BrowserProvider(window.ethereum);
        const balanceBigInt = await provider.getBalance(address);
        const balanceEther = formatEther(balanceBigInt);
        setBalance(parseFloat(balanceEther).toFixed(4));
=======
        // const provider = new BrowserProvider(window.ethereum);
        // const balance = await provider.getBalance(address);
        // setBalance(balance.toFixed(4)); // Format balance to 4 decimal places
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

<<<<<<< HEAD
  const handleRoleSelection = async (role: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/save-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, role }),
      });
  
      if (response.ok) {
        setRole(role);
        localStorage.setItem("userRole", role); // Save the role to local storage
        setIsRoleModalOpen(false); // Close the modal after successful save
        navigate("/profile"); // Redirect to profile page
      } else {
        const errorData = await response.json();
        console.error("Failed to save role:", errorData);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error:", error);
      // You might want to show an error message to the user here
    }
  };

  const logout = () => {
    setWalletAddress("");
    setRole("");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("userRole");
    navigate("/");
  };

=======
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
  return (
    <header className="bg-[#fff] border-b fixed top-0 left-0 w-[100vw]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Left - Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img alt="Logo" src={Logo} className="h-6 w-auto" />
          </NavLink>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            to="/disputes"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Dispute
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/awards"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Awards
          </NavLink>
          <NavLink
            to="/profile"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Profile
          </NavLink>
          <NavLink
            to="/flash-loan"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Flash Loan
          </NavLink>
        </div>

        {/* Right - Wallet Connection */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-semibold leading-6 text-gray-900">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900">
                ({balance} ETH)
              </span>
              <button onClick={logout} className="ml-4 text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                Logout
              </button>
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

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={mobileMenuOpen ? "block" : "hidden"}>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <img alt="Logo" src={Logo} className="h-8 w-auto" />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/profile"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </NavLink>
<<<<<<< HEAD
                <NavLink to="/disputes" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Disputes
=======
                <NavLink
                  to="/disputes"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Dispute
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
                </NavLink>
                <NavLink
                  to="/awards"
                  className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Awards
                </NavLink>
              </div>
              <div className="py-6">
                {walletAddress ? (
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-5 w-5 text-gray-900" />
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                      ({balance} ETH)
                    </span>
                    <button onClick={logout} className="ml-4 text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                      Logout
                    </button>
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
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {isRoleModalOpen && (
  <RoleSelectionModal 
    onSelectRole={handleRoleSelection}
    onClose={() => setIsRoleModalOpen(false)} 
    walletAddress={walletAddress} 
  />
)}    
=======
>>>>>>> c78f2fa4c3381d1626ac846a5fec9160fdb3de99
    </header>
  );
}
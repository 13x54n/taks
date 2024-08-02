import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    if (walletAddress) {
      getBalance(walletAddress);
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
        <div className="hidden lg:flex lg:gap-x-12">
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
                <NavLink to="/" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </NavLink>
                <NavLink to="/profile" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Profile
                </NavLink>
                <NavLink to="/disputes" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Dispute
                </NavLink>
                <NavLink to="/awards" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
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
    </header>
  );
}

import { useState, useEffect } from "react";
import { BrowserProvider, formatEther } from "ethers";
import { useNavigate, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import RoleSelectionModal from "./ui/RoleSelectionModel";
import Logo from "../../public/logo.png";
import { useWallet } from "../context/WalletContext";

// Add global declaration for TypeScript
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [balance, setBalance] = useState<string>("");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { walletAddress, setWalletAddress, setRole } = useWallet();
  const navigate = useNavigate();

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

  const connectWallet = async (): Promise<void> => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsRoleModalOpen(true);
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
        const balanceBigInt = await provider.getBalance(address);
        const balanceEther = formatEther(balanceBigInt);
        setBalance(parseFloat(balanceEther).toFixed(4));
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

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

  return (
    <header className="bg-white border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <img alt="Logo" src={Logo} className="h-6 w-auto" />
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink to="/home" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/disputes" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
            Dispute
          </NavLink>
          <NavLink to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
            Dashboard
          </NavLink>
          <NavLink to="/awards" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
            Awards
          </NavLink>
          <NavLink to="/profile" className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
            Profile
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {walletAddress ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
              <UserCircleIcon className="h-5 w-5 text-gray-900" />
              <span className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                ({balance} ETH)
              </span>
              <button onClick={logout} className="ml-4 text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-primary cursor-pointer hover:text-primary"
            >
              Connect Wallet
            </button>
          )}
        </div>

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
                  Disputes
                </NavLink>
                <NavLink to="/awards" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Awards
                </NavLink>
              </div>
              <div className="py-6">
                {walletAddress ? (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
                    <UserCircleIcon className="h-5 w-5 text-gray-900" />
                    <span className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                      ({balance} ETH)
                    </span>
                    <button onClick={logout} className="ml-4 text-sm font-semibold leading-6 text-gray-900 hover:text-primary">
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-primary cursor-pointer hover:text-primary"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isRoleModalOpen && (
  <RoleSelectionModal 
    onSelectRole={handleRoleSelection}
    onClose={() => setIsRoleModalOpen(false)} 
    walletAddress={walletAddress} 
  />
)}    
    </header>
  );
}

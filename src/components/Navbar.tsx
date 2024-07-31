import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import {
  Dialog,
  Disclosure,
  Popover,
  PopoverGroup,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Logo from "../../public/logo.png";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      getResponse: () => string | null;
      reset: () => void;
    };
  }
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const loadRecaptchaScript = () => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6Ldd_xoqAAAAADr3aQJ7Ol5npoXycBpGejEcIi4j`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("reCAPTCHA script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };
    document.body.appendChild(script);
  };

  const executeRecaptcha = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (typeof window.grecaptcha !== 'undefined') {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6Ldd_xoqAAAAADr3aQJ7Ol5npoXycBpGejEcIi4j', { action: 'submit' })
            .then((token: string) => {
              console.log("reCAPTCHA token received:", token);
              resolve(token);
            })
            .catch((error: Error) => {
              console.error("reCAPTCHA error:", error);
              reject(error);
            });
        });
      } else {
        reject(new Error('reCAPTCHA not loaded'));
      }
    });
  };

  const connectWallet = async (): Promise<void> => {
    try {
      const recaptchaToken = await executeRecaptcha();
      if (!recaptchaToken) {
        alert("Please complete the CAPTCHA");
        return;
      }

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
      if (error instanceof Error && error.message === "User rejected the request.") {
        alert("You need to accept the request to connect your wallet.");
      } else {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <>
      <header className="bg-white border-b">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Logo" src={Logo} className="h-6 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Product
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </Popover.Button>

              <Popover.Panel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Popover>

            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Company
            </a>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {walletAddress ? (
              <span className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-[#7DD956]">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            ) : (
              <>
                <button
                  onClick={connectWallet}
                  className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-[#7DD956]"
                >
                  Connect Wallet
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Logo" src={Logo} className="h-8 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <Disclosure.Button className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </Disclosure.Panel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <button
                  onClick={connectWallet}
                  className="text-sm font-semibold leading-6 text-gray-900 border-b-2 border-b-[#7DD956]"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

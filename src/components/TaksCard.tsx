"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TaksCard() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="my-4 border-b p-4 cursor-pointer transition-all ease-in-out hover:bg-gray-50"
      onClick={() => setOpen(true)}
    >
      <p className="text-sm font-semibold text-gray-500">
        Posted 24 minutes ago
      </p>
      <h1 className="text-lg font-semibold transition-all ease-in-out hover:text-[#7ED955]">
        Consultation with an expert in blockchain and smart contract development
      </h1>
      <p className="text-sm my-3">Expert - Est. Budget: $500 USDC</p>
      <p>
        I have got a script which buys and sells tokens using solana jito
        bundle. Once I put token ca in env file and run the script it repeats
        buy / sell for certain round with one wallet. I would like to update
        this script so it buys / sells token with difference wallets each time.
      </p>
      <ul className="flex flex-wrap my-3 gap-2">
        <li className="bg-gray-200 text-sm p-0.5 px-1 text-gray-700">
          Blockchain
        </li>
        <li className="bg-gray-200 text-sm p-0.5 px-1 text-gray-700">
          Ethereum
        </li>
      </ul>
      <div className="mt-2">
        <p className="text-gray-600">
          👷 <span className="text-gray-700 font-medium">Creator</span>:
          0x6a68D992ad04352cfF67acb4bd9808cdB8d88DfF
        </p>
        <p className="text-gray-600">
          📜 <span className="text-gray-700 font-medium">Proposals</span>: Less
          than 5
        </p>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900 flex items-center justify-between">
                      <p>Taks#1</p>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md focus:outline-none cursor-pointer focus:ring-2 focus:ring-white border-b-2 hover:border-gray-400 hover:bg-gray-200 transition-all ease-in-out bg-gray-50 text-xs py-1 p-2.5 pb-0"
                      >
                        ESC
                      </button>
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <p className="text-sm font-semibold text-gray-500">
                      Posted 24 minutes ago
                    </p>
                    <h1 className="text-lg font-semibold transition-all ease-in-out hover:text-[#7ED955] mt-4 leading-6">
                      Consultation with an expert in blockchain and smart
                      contract development
                    </h1>
                    <p className="text-gray-600 mt-4">
                      👷{" "}
                      <span className="text-gray-700 font-medium">Creator</span>
                      : 0x6a68...8DfF
                    </p>

                    <p className="text-gray-600 mb-4">
                      📜{" "}
                      <span className="text-gray-700 font-medium">
                        Proposals
                      </span>
                      : Less than 5
                    </p>
                    <hr />
                    <p className="mt-4 text-sm font-semibold text-gray-500">Description</p>
                    <p className="text-sm">
                      I have got a script which buys and sells tokens using
                      solana jito bundle. Once I put token ca in env file and
                      run the script it repeats buy / sell for certain round
                      with one wallet. I would like to update this script so it
                      buys / sells token with difference wallets each time.
                    </p>

                    <p className="text-sm my-3 font-semibold text-gray-500">
                      Expert - Est. Budget: $500 USDC
                    </p>
                    <p className="text-sm">✅ Payment Verified</p>
                    <p>Transaction Hash: 0x45gh4532jjku...09i</p>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

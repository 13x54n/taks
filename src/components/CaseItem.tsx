import React, { useEffect, useState, useRef, memo } from "react";
import { castVote, getAllDisputes } from "@/api/daoInteractions";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { address } from "@/utils/ViemConfig";
import { toast } from "react-toastify";

const CaseItem = memo(() => {
  const [disputes, setDisputes] = useState([]);
  const fetchedRef = useRef(false);
  const [open, setOpen] = useState(false)
  const [activeDispute, setActiveDispute] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      const _address = await address();
      setWalletAddress(_address);
    })()
  }, [])

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const disputesData:any = await getAllDisputes();
        console.log("DisputesData:", disputesData);
        setDisputes(disputesData);
      } catch (error) {
        console.error("Failed to fetch disputes(caseItem.tsx):", error);
      }
    };

    if (!fetchedRef.current) {
      fetchDisputes();
      fetchedRef.current = true;
    }
  }, []);

  if (!disputes.length) {
    return <p className="text-gray-500 text-center">No disputes found</p>;
  }

  const handleVote = (e:any) => {
    setOpen(true)
    setActiveDispute(e)
  }

  function getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }

  const _castVote = async (v: any) => {
    try {
      const data = await castVote("83869865984151390433809600402577260350644317155819892029128161120951090966203", v)
      console.log(data);

      setOpen(false)
      toast(`Vote Casted: ${v == 0 ? "For" : v == 1 ? "Against" : "Abstain"}`)
      toast(`Proposal ID: ${getRandomInt(10000285).toString()}...${getRandomInt(10000285).toString()}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
    
      {disputes.map((dispute:any, index) => (
        <div
        key={index}
        className="bg-white shadow-md rounded-lg p-6 mb-4 transition duration-500 hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Dispute ID: {dispute.disputeId.toString()}
          </h3>
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span> {dispute.description}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Initiator:</span> {dispute.initiator}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Target:</span> {dispute.target}
          </p>

          <div className="mt-4 flex justify-end space-x-4">
            <button
            onClick={() => handleVote(dispute)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Vote
            </button>
          </div>
        </div>
      ))}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
  
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Voting: {activeDispute  && activeDispute.description}
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s" className="w-14" alt="" />
                        <div>
                        <p className="text-sm font-medium">{walletAddress}</p>    
                      <p className="text-sm text-gray-500">
                       Voting Power: {getRandomInt(100)}
                      </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h1 className="font-medium">Vote</h1>
                        <button onClick={() => _castVote(0)} className="my-1 w-full border-2 bg-green-400 text-white">For</button>
                        <button onClick={() => _castVote(1)} className="my-1 w-[100%] border-2 bg-red-500 text-white">Against</button>
                        <button onClick={() => _castVote(2)} className="my-1 w-[100%] border-2 bg-gray-500 text-white">Abstain</button>
                      </div>

                      <div className="mt-4">
                        <p className="font-medium">Add Comment</p>
                        <textarea cols={50} className="border-2 p-1" placeholder="Why are you voting this way?"></textarea>
                      </div>

                      <button onClick={()=> setOpen(false)} className="bg-gray-900 text-white px-1">Cancel</button>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

export default CaseItem;

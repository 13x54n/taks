import { getContract } from "viem";
import JobTreasuryABI from "../utils/JobTreasuryABI.json";
import { address, publicClient, walletClient } from "@/utils/ViemConfig";

// const CONTRACT_ADDRESS = import.meta.env.VITE_JOB_TREASURY_CONTRACT_ADDRESS;

const contract = getContract({
  address: "0xFCc61d21F57FB390b3809E5FA62fe77148BE368C",
  abi: JobTreasuryABI,
  client: {
    public: publicClient,
    wallet: walletClient,
  },
});

export const getJobData = async (jobId: string) => {
  return await contract.read.getJob([jobId]);
};

export const getLoan = async (jobId: string) => {
  try {
    const _address = await address()
    const { request } = await publicClient.simulateContract({
      account: _address,
      address: "0xFCc61d21F57FB390b3809E5FA62fe77148BE368C",
      abi: JobTreasuryABI,
      functionName: "getLoan",
      args: [jobId],
    });

    // eslint-disable-next-line no-use-before-define
    await walletClient.writeContract(request); // Works with warning
  } catch (error) {
    console.error(typeof(error));
  }
};

export const addJob = async (
  job: any,
  assignedTo: string // Address of assigned user (converted to address payable)
) => {
  try {
    const _address = await address(); // Get user's wallet address
    const {job_id,eligible_for_flash_loans, payment} = job;

    const { request } = await publicClient.simulateContract({
      account: _address,
      address: "0xFCc61d21F57FB390b3809E5FA62fe77148BE368C",
      abi: JobTreasuryABI,
      functionName: "addJob",
      // flashloan amount must be positive number or 0
      args: [job_id, payment, eligible_for_flash_loans? payment / 2 : 0, assignedTo],
      value: payment 
    });

    await walletClient.writeContract(request); // Execute the transaction
  } catch (error) {
    console.error(typeof error); // Handle errors
  }
};

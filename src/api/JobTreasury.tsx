import { getContract } from "viem";
import JobTreasuryABI from "../utils/JobTreasuryABI.json";
import { address, publicClient, walletClient } from "@/utils/ViemConfig";

// const CONTRACT_ADDRESS = import.meta.env.VITE_JOB_TREASURY_CONTRACT_ADDRESS;

const contract = getContract({
  address: "0xf66aA8980700F92BF99Af939A1834d6429818515",
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
    const { request } = await publicClient.simulateContract({
      account: address[0],
      address: "0xf66aA8980700F92BF99Af939A1834d6429818515",
      abi: JobTreasuryABI,
      functionName: "getLoan",
      args: [jobId],
    });

    // eslint-disable-next-line no-use-before-define
    await walletClient.writeContract(request); // Works with warning
  } catch (error) {
    console.log(error);
  }
};


import DaoABI from "../utils/DaoABI.json"; // Replace with the correct path to your ABI
import { publicClient, walletClient } from "@/utils/ViemConfig";

// Use the provided DAO contract address
const DAO_CONTRACT_ADDRESS = "0x31f5a3b67bbe58fa6312e6fd733696a973bb5084";

// Function to get job data
export const getJobData = async (jobId: string) => {
  try {
    const jobData = await publicClient.readContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'getJob',
      args: [jobId],
    });
    return jobData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch job data");
  }
};

// Function to post a job
export const postJob = async (jobTitle: string, jobDescription: string, salary: string) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'postJob',
      args: [jobTitle, jobDescription, salary],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to post job");
  }
};

// Function to apply for a job
export const applyForJob = async (jobId: string, coverLetterIpfsHash: string, resumeIpfsHash: string) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'applyForJob',
      args: [jobId, coverLetterIpfsHash, resumeIpfsHash],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to apply for job");
  }
};

// Function to hire an employee
export const hireEmployee = async (jobId: string, employeeAddress: string) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'hireEmployee',
      args: [jobId, employeeAddress],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to hire employee");
  }
};

// Function to raise a dispute
export const raiseDispute = async (description: string, targetAddress: string, isAgainstEmployer: boolean) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'raiseDispute',
      args: [description, targetAddress, isAgainstEmployer],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to raise dispute");
  }
};

// Function to create a dispute proposal
export const createDisputeProposal = async (disputeId: string, targetAddress: string, isAgainstEmployer: boolean) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'createDisputeProposal',
      args: [disputeId, targetAddress, isAgainstEmployer],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create dispute proposal");
  }
};

// Function to execute a dispute
export const executeDispute = async (disputeId: string, proposalId: string, targetAddress: string, isAgainstEmployer: boolean) => {
  try {
    const { request } = await publicClient.simulateContract({
      address: DAO_CONTRACT_ADDRESS,
      abi: DaoABI,
      functionName: 'executeDispute',
      args: [disputeId, proposalId, targetAddress, isAgainstEmployer],
      account: await walletClient.getAddresses().then(addresses => addresses[0]),
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to execute dispute");
  }
};
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const address: any =
  window.ethereum &&
  (await window?.ethereum.request({
    method: "eth_requestAccounts",
  }));

console.log(address);

// eg: Metamask
export const walletClient = createWalletClient({
  account: address[0],
  chain: sepolia,
  transport: custom(window.ethereum!),
});

import { createPublicClient, createWalletClient, http, custom } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
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
  chain: baseSepolia,
  transport: custom(window.ethereum!),
});

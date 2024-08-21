import { createPublicClient, createWalletClient, http, custom } from "viem";
import { baseSepolia, } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const address: any = async () => {
  const isUserLoggedIn: any | null = localStorage.getItem("walletAddress") || [""];

  if(isUserLoggedIn.length > 0 && window.ethereum){
    const address: any  = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return address[0]
  }
}
// eg: Metamask
export const walletClient = createWalletClient({
  account: address[0],
  chain: baseSepolia,
  transport: custom(window.ethereum!),
});

interface EthereumProvider {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    // Add other methods and properties you use from the Ethereum provider
  }
  
  interface Window {
    ethereum?: EthereumProvider;
  }
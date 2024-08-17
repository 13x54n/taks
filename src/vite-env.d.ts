/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_JOB_TREASURY_CONTRACT_ADDRESS: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
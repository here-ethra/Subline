
/// <reference types="vite/client" />

declare module "@alchemy/aa-alchemy" {
  import { type Chain } from "wagmi";
  import { type Address } from "viem";
  
  export type AlchemyProvider = any;
  
  export interface SmartAccountClientConfig {
    apiKey: string;
    chain: Chain;
    signer: any;
    gasManagerConfig?: {
      policyId: string;
    };
    account: any;
  }

  export function createAlchemySmartAccountClient(config: SmartAccountClientConfig): Promise<any>;
}

declare module "@alchemy/aa-accounts" {
  import { type Chain } from "wagmi";
  import { type Address } from "viem";
  
  export interface MultiOwnerModularAccountConfig {
    owner: any;
    chain: Chain;
    entryPoint: Address;
    factoryAddress: string;
  }

  export function createMultiOwnerModularAccount(config: MultiOwnerModularAccountConfig): Promise<any>;
}

declare module "@alchemy/aa-core" {
  export type SmartAccountSigner = any;
  export type SmartContractAccount = any;
  export type LocalAccountSigner = any;
}

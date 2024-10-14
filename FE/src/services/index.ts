/* eslint-disable @typescript-eslint/no-explicit-any */
import { instanceCoreApi } from "@/config/axios.config"

interface TreasuryWalletResponse {
    message: string;
    status: number;
    metadata: {
        address: string;
        balance: string;
    };
}

export const getTreasuryWallet = async (): Promise<TreasuryWalletResponse> => {
    const result = await instanceCoreApi.get<TreasuryWalletResponse>("/v1/api/usdc_operation/treasury-wallet")
    return result.data
}

interface GenerateAddressResponse {
    message: string;
    status: number;
    metadata: {
        address: string;
    };
    options: Record<string, any>;
}

export const generateAddress = async (): Promise<GenerateAddressResponse> => {
    const result = await instanceCoreApi.post<GenerateAddressResponse>("/v1/api/usdc_operation/create-wallet")
    return result.data
}

interface MintResponse {
    message: string;
    status: number;
    metadata: {
        transactionHash: string;
    };
    options: Record<string, any>;
}


export const mintTo = async ({ address, amount }: { address: string, amount: string }): Promise<MintResponse> => {
    const result = await instanceCoreApi.post<MintResponse>("/v1/api/usdc_operation/mint", { address: address, amount: amount })
    return result.data
}

interface CollectUSDCResponse {
    message: string;
    status: number;
    metadata: {
        txHash: string;
    };
    options: Record<string, any>;
}

export const collection = async (address: string) => {
    const result = await instanceCoreApi.post<CollectUSDCResponse>("/v1/api/usdc_operation/collect", { fromAddress: address, })
    return result.data
}

interface BurnUSDCResponse {
    message: string;
    status: number;
    metadata: {
      hash: string;
    };
    options: Record<string, any>;
  }

export const burn = async ({ address, amount }: { address: string, amount: string }) => {
    const result = await instanceCoreApi.post<BurnUSDCResponse>("/v1/api/usdc_operation/burn", { address: address, amount: amount })
    return result.data
}
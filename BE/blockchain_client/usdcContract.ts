import { privateKeyToAccount } from "viem/accounts"
import { STABLE_USDC } from "../contants/usdc_abi"
import { publicClient, account, walletClient, userClient } from "./client"
import { parseGwei } from "viem"

const usdc_address = '0x384c493b70c142efea1b5E858072bC1A17812065'

class UsdcContract {

    balanceOf = async (address: `0x${string}`) => {
        const balance = await publicClient.readContract({
            address: usdc_address,
            abi: STABLE_USDC,
            functionName: "balanceOf",
            args: [address]
        })

        return balance
    }

    mint = async (address: `0x${string}`, amount: bigint) => {
        const { request } = await publicClient.simulateContract({
            account,
            address: usdc_address,
            abi: STABLE_USDC,
            functionName: 'mint',
            args: [address, amount]
        })

        const hash = await walletClient.writeContract(request);

        await publicClient.waitForTransactionReceipt({ hash })

        return hash
    }

    transferFrom = async ({ spender, received, amount }: { spender: `0x${string}`, received: `0x${string}`, amount: bigint }) => {
        const { request } = await publicClient.simulateContract({
            account,
            address: usdc_address,
            abi: STABLE_USDC,
            functionName: 'transferFrom',
            args: [spender, received, amount]
        })

        const hash = await walletClient.writeContract(request);

        await publicClient.waitForTransactionReceipt({ hash })

        return hash
    }

    approve = async ({ spender, userKey, amount }: { spender: `0x${string}`, userKey: `0x${string}`, amount: bigint }) => {

        const account = privateKeyToAccount(userKey);

        const client = userClient(account);

        const { request } = await publicClient.simulateContract({
            account,
            address: usdc_address,
            abi: STABLE_USDC,
            functionName: "approve",
            args: [spender, amount],
        })

        const hash = await client.writeContract(request)

        await publicClient.waitForTransactionReceipt({ hash })

        return hash
    }

    burn = async (amount: bigint) => {
        const { request } = await publicClient.simulateContract({
            account,
            address: usdc_address,
            abi: STABLE_USDC,
            functionName: "burn",
            args: [amount]
        })

        const hash = await walletClient.writeContract(request)

        await publicClient.waitForTransactionReceipt({ hash })


        return hash
    }
}

const usdcContract = new UsdcContract

export default usdcContract
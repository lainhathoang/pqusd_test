import { parseUnits } from "viem"
import usdcContract from "../blockchain_client/usdcContract"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import fs from 'fs'
import path from "path"
import { walletClient, account, publicClient } from "../blockchain_client/client"
import { BadRequestError, ForbiddenError } from "../core/error.response"
import { MAX_UINT256 } from "../contants"

type IMintParams = {
    address: `0x${string}`
    amount: string
}

class UsdcOperationService {

    treasuryWallet = async () => {
        const balance = await usdcContract.balanceOf(account.address)
        return { address: account.address, balance: balance.toString() }
    }

    mint = async ({ address, amount }: IMintParams) => {


        const txHash = await usdcContract.mint(address, parseUnits(amount, 6))

        return { transactionHash: txHash }
    }

    generateAddress = async () => {
        try {
            const pathData = path.join(process.cwd(), 'data/account.json')
            const data = fs.readFileSync(pathData, 'utf-8')
            const parseData = JSON.parse(data);
            const privateKey = generatePrivateKey()
            const generatedaccount = privateKeyToAccount(privateKey)
            const address = generatedaccount.address

            const hash = await walletClient.sendTransaction({
                account,
                to: address,
                value: parseUnits('0.001', 18)
            })

            await publicClient.waitForTransactionReceipt({
                hash: hash
            })


            parseData[address] = privateKey;

            await usdcContract.approve({ amount: BigInt(MAX_UINT256), spender: account.address, userKey: privateKey })

            fs.writeFileSync(pathData, JSON.stringify(parseData), 'utf-8')
            return { address }
        } catch (error: any) {
            console.log(error)
            throw new ForbiddenError(error.message || "Funding address faild")

        }
    }

    transferFrom = async ({ fromAddress }: { fromAddress: `0x${string}` }) => {

        const fromAddressBalance = await usdcContract.balanceOf(fromAddress);

        const tx = await usdcContract.transferFrom({ spender: fromAddress, amount: fromAddressBalance, received: account.address })

        return { txHash: tx }
    }

    burn = async ({ amount, address }: { amount: string, address: `0x${string}` }) => {

        if (address != account.address) {
            throw new BadRequestError("Invalid address")
        }

        const parsedAmount = parseUnits(amount, 6)
        const balance = await usdcContract.balanceOf(account.address);

        if (balance < parsedAmount) {
            throw new BadRequestError("Insufficient USDC balance to complete the transaction")
        }

        const tx = await usdcContract.burn(parsedAmount);

        return { hash: tx }
    }

}

const usdcOperationService = new UsdcOperationService()

export default usdcOperationService;
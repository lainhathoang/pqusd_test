import { Account, createPublicClient, createWalletClient, http } from 'viem'
import {privateKeyToAccount} from 'viem/accounts';
import {bscTestnet} from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http()
})

export const userClient = (account:Account) => createWalletClient({
    account,
    chain: bscTestnet,
    transport: http()
})



const privateKey:`0x${string}` = process.env.PRIVATE_KEY as `0x${string}` ?? '' 

export const account = privateKeyToAccount(privateKey);

export const walletClient = userClient(account)




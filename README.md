# USDC v2.2 Deployment & Interaction on Ethereum Sepolia Testnet

This repository contains a simple backend API built with NodeJS and a frontend interface using ReactJS. The purpose of this technical test is to deploy and interact with USDC v2.2 on the Ethereum Sepolia Testnet, including minting, wallet creation, USDC collection, and burning functionalities.

## Backend Overview

### API Endpoints

1. **Mint USDC**  
   - **Endpoint**: `POST /mint`  
   - **Parameters**:  
     - `amount`: The amount of USDC to mint.
     - `wallet_address`: The wallet address to mint USDC to.  
   - **Returns**: Transaction hash (TX).

2. **Create Wallet**  
   - **Endpoint**: `POST /create-wallet`  
   - **Returns**:  
     - `wallet_address`: The new wallet address created.
     - Sets allowance for spending USDC by the treasury wallet.

3. **Collect USDC**  
   - **Endpoint**: `POST /collect`  
   - **Parameters**:  
     - `from_address`: The wallet address from which USDC will be collected.
     - `to_address`: The wallet address to which USDC will be transferred.  
   - **Returns**: Transaction hash (TX).

4. **Burn USDC**  
   - **Endpoint**: `POST /burn`  
   - **Parameters**:  
     - `amount`: The amount of USDC to burn.
     - `wallet_address`: The wallet address from which USDC will be burned.  
   - **Returns**: Transaction hash (TX).

### .env Variables
(We sent the `.env` testing file to you. Please place it only into the BE folder.)
- `TREASURY_WALLET`: The treasury wallet account used for interacting with the API (hardcoded).
- `PRIVATE_KEY`: Private key for the treasury wallet account (for signing transactions).

## Frontend Overview

The frontend is built using ReactJS and provides an interface for interacting with the backend API.

### Features

1. **Display Treasury Wallet Information**: Shows the wallet address and USDC balance of the hardcoded treasury wallet.
2. **Create a New Wallet**: Allows users to create a new wallet and view the wallet address and balance.
3. **Mint USDC**: Users can mint a specific amount of USDC to the newly created wallet.
4. **Collect USDC**: Transfer all USDC from the newly created wallet to the treasury wallet.
5. **Burn USDC**: Burn a specified amount of USDC from the treasury wallet.

## Start project
0. Put the `.env` file into the BE folder.
1. Backend: `yarn dev`.
2. Frontend: `yarn dev`.

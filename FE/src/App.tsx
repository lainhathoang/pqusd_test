import { useMutation, useQuery } from "@tanstack/react-query";
import {
  burn,
  collection,
  generateAddress,
  getTreasuryWallet,
  mintTo,
} from "./services";
import { formatUnits } from "viem";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
  const [mint, setMint] = useState({ amount: "0", address: "" });
  const [address, setAddress] = useState("");
  const [burnAmount, setBurnAmount] = useState('')

  const { data, refetch } = useQuery({
    queryKey: ["GET_TREASURY_WALLET"],
    queryFn: getTreasuryWallet,
  });

  const {
    data: generatedAddressData,
    mutate: generate,
    isPending,
  } = useMutation({
    mutationKey: ["GENERATE_ADDRESS"],
    mutationFn: generateAddress,
  });

  const {
    mutate: mutateMint,
    data: mintHash,
    isPending: mintPending,
  } = useMutation({
    mutationKey: ["MINT"],
    mutationFn: async (params: { address: string; amount: string }) =>
      mintTo({ address: params.address, amount: params.amount }),
  });

  const {
    mutate: mutateTransfer,
    data: transferHash,
    isPending: transferPending,
  } = useMutation({
    mutationKey: ["TRANSFER_FROM"],
    mutationFn: async (params: string) => collection(params),
    onSuccess: () => {
      refetch();
      setMint({ amount: "0", address: "" });
    },
  });

  const {
    mutate: mutateBurn,
    data: burnHash,
    isPending: burnPending,
  } = useMutation({
    mutationKey: ["BURN"],
    mutationFn: async (params: { address: string; amount: string }) => burn({address: params.address, amount: params.amount}),
    onSuccess: () => {
      refetch();
    },
  });

  const treasuryWalletBalance = formatUnits(
    BigInt(data?.metadata.balance ?? 0),
    6
  );

  const handClickMint = () => {
    mutateMint({ address: mint.address, amount: mint.amount });
  };

  const handleClickTranser = () => {
    mutateTransfer(address);
  };

  const handleBurnToken = () => {
    if(data?.metadata.address){
      mutateBurn({address: data?.metadata.address, amount: burnAmount})
    }
  }

  const handleInput = (type: string, data: string) => {
    switch (type) {
      case "address":
        setMint((prev) => ({ ...prev, address: data }));
        break;
      case "amount":
        setMint((prev) => ({ ...prev, amount: data }));
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          Treasury Wallet: {data?.metadata.address}
        </h1>
        <h3 className="text-xl font-bold">Balance: {treasuryWalletBalance}</h3>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Generate Address</h1>
        <div>
          {isPending ? "Loading..." : generatedAddressData?.metadata.address}
        </div>
        <Button onClick={() => generate()}>Generate</Button>
      </div>
      <Separator />
      <div className="w-[250px]">
        <h1 className="text-2xl font-bold">Mint To</h1>
        <div>
          {mintPending ? (
            "Minting..."
          ) : (
            <a
              target="_blank"
              href={`https://testnet.bscscan.com/tx/${mintHash?.metadata.transactionHash}`}
            >
              {mintHash?.metadata.transactionHash}
            </a>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div>
            <Label>Address:</Label>
            <Input
              value={mint.address}
              onChange={(e) => handleInput("address", e.target.value)}
            />
          </div>
          <div>
            <Label>Amount:</Label>
            <Input
              value={mint.amount}
              onChange={(e) => handleInput("amount", e.target.value)}
            />
          </div>
          <Button onClick={handClickMint}>Mint</Button>
        </div>
      </div>
      <Separator />
      <div className="w-[250px]">
        <h1 className="text-2xl font-bold">
          Collect Token From Generated Address
        </h1>
        <div>
          {transferPending ? (
            "Minting..."
          ) : (
            <a
              target="_blank"
              href={`https://testnet.bscscan.com/tx/${transferHash?.metadata.txHash}`}
            >
              {transferHash?.metadata.txHash}
            </a>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div>
            <Label>Address:</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button onClick={handleClickTranser}>Collect</Button>
        </div>
      </div>
      <Separator />
      <div className="w-[250px]">
        <h1 className="text-2xl font-bold">Burn Token From Treasury Wallet</h1>
        <div>
          {burnPending ? (
            "Burning..."
          ) : (
            <a
              target="_blank"
              href={`https://testnet.bscscan.com/tx/${burnHash?.metadata.hash}`}
            >
              {burnHash?.metadata.hash}
            </a>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div>
            <Label>Amount:</Label>
            <Input
              value={burnAmount}
              onChange={(e) =>setBurnAmount(e.target.value)}
            />
          </div>
          <Button onClick={handleBurnToken}>Burn Token</Button>
        </div>
      </div>
    </div>
  );
}

export default App;

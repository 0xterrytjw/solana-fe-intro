"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as Web3 from "@solana/web3.js";

const SolanaClient = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0); // balance denominated in SOL
  const [isExecutable, setIsExecutable] = useState(false); // balance denominated in SOL

  const checkBalance = async () => {
    if (!address) {
      alert(`Please enter an address!`);
      return;
    }

    try {
      const key = new Web3.PublicKey(address);
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
      const bal = await connection.getBalance(key);
      setBalance(bal / Web3.LAMPORTS_PER_SOL);

      const account = await connection.getAccountInfo(key);
      setIsExecutable(account?.executable || false);
    } catch (error) {
      setAddress("");
      setBalance(0);
      alert(`${error}, Please enter a valid address!`);
    }
  };

  return (
    <main className="w-1/2 p-4 mt-12">
      <Label htmlFor="address">Solana address</Label>
      <Input
        type="text"
        id="address"
        placeholder="HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH"
        className="placeholder:text-gray-600 dark:border-gray-500"
        autoComplete="off"
        value={address}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAddress(e.target.value)
        }
      />

      <div className="flex justify-center mt-8">
        <Button onClick={checkBalance}>Check balance</Button>
      </div>

      <div className="mt-4 p-4">
        <p className="text-center rounded-xl">Balance: {balance}</p>
        <p className="text-center rounded-xl">
          Executable: {isExecutable ? "Yes" : "No"}
        </p>
      </div>
    </main>
  );
};

export default SolanaClient;

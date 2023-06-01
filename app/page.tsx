import CustomLink from "@/components/CustomLink";
import { FaGithub } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SolanaClient from "./SolanaClient";

const HomePage = async () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center tracking-widest">
      <h1 className="animate-pulse text-3xl font-bold">Solana FE Intro 🚀</h1>
      <SolanaClient />
    </main>
  );
};

export default HomePage;

import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="p-64">
      <h1 className="text-3xl font-bold underline">Elision</h1>

      <div>[leaving something out? nah no way.]</div>

      <div className="py-4"></div>

      <Link
        href="/demo"
        className="bg-fuchsia-500 px-4 py-1 rounded text-white"
      >
        Get Started
      </Link>
    </div>
  );
}

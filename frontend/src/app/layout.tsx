import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WalletProvider } from "@/components/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vigil | Zero-Knowledge Inheritance",
  description: "Trustless Proof-of-Life on the Midnight Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <WalletProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}

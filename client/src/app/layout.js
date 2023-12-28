"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>{children}</RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}

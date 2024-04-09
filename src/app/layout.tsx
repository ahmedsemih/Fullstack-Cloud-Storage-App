import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Layout from "@/components/layout";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Locker",
  description:
    "Your hassle-free solution for storing and accessing files in the cloud. With secure storage, easy organization, and seamless syncing, Cloud Locker keeps your important documents safe and accessible from anywhere. Sign up now and simplify your digital life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavSc from "@/components/Nav-SC";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Manager",
  description: "Manage Businesses Efficently, generate customer invoices and keep track of expenditures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavSc />
        {children}
      </body>
    </html>
  );
}

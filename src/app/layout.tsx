import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { GeistSans } from "geist/font/sans";

const geist = GeistSans;

export const metadata: Metadata = {
  title: "Technomart",
  description: "Your Tech E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

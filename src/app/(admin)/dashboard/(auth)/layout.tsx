import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page Technomart",
  description: "This is page for authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

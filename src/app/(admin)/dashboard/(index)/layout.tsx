import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin Technomart",
  description: "This is dashboard for admin",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

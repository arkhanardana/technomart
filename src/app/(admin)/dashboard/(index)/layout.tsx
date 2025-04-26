import type { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Dashboard Admin Technomart",
  description: "This is dashboard for admin",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="py-4 px-6">{children}</main>
      </div>
    </div>
  );
}

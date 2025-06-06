import type { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard Admin Technomart",
  description: "This is dashboard for admin",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (!session || user.role !== "superadmin") {
    return redirect("/dashboard/sign-in");
  }
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

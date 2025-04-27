import { getUser } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Page Technomart",
  description: "This is page for authentication",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (session && user.role === "superadmin") {
    return redirect("/dashboard");
  }

  return <main>{children}</main>;
}

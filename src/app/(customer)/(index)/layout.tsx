import { getUser } from "@/lib/auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin-ext"],
});

export default async function CustomerLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { session, user } = await getUser();

  if (session && user.role === "superadmin") {
    return redirect("/dashboard");
  }
  return (
    <main>
      <div className={poppins.className}>{children}</div>
    </main>
  );
}

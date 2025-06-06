import { Poppins } from "next/font/google";
import { ReactNode } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin-ext"],
});

export default function CustomerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className={poppins.className}>{children}</div>
    </main>
  );
}

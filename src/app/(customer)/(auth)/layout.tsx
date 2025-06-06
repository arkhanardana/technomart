import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin-ext"],
});

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <div className={poppins.className}>{children}</div>
    </main>
  );
}

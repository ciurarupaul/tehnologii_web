import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Headers";
import { workSans } from "@/utils/fonts";
import type { ReactNode } from "react";
import "../scss/main.scss";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

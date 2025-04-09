import { Karla } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const metadata = {
  title: "Mesell - Nigerian Pre-Order Ecommerce Platform",
  description:
    "A secure and trusted pre-order ecommerce platform built for the Nigerian market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${karla.variable} min-h-screen w-full bg-background font-sans antialiased`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

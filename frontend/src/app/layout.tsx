import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata = {
  title: "Mesell - African Pre-Order Ecommerce Platform | Africa at Large",
  description:
    "A secure and trusted pre-order ecommerce platform built for the Nigerian market and Africa at large.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <body className="min-h-screen w-full bg-background font-sans antialiased">
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1 w-full pt-20 md:pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

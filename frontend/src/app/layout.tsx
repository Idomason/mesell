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
  title: "Mesell - Nigerian Pre-Order Ecommerce Platform | Africa at Large",
  description:
    "A secure and trusted pre-order ecommerce platform built for the Nigerian market and Africa at large.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} min-h-screen w-full bg-background font-sans antialiased`}
        style={{
          fontFamily: `var(--font-plus-jakarta), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
        }}
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

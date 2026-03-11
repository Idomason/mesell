import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

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
  icons: {
    icon: "/favicon.co",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <body className="min-h-screen w-full bg-background font-sans antialiased">
        <div className="min-h-screen w-full">
          <main className="flex-1 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}

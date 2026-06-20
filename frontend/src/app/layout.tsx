import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Provider from "@/components/tankstack/providers";
import { Toaster } from "sonner";

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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen w-full bg-background font-sans antialiased">
        <Provider>
          <Toaster richColors />
          <div className="min-h-screen w-full">
            <main className="flex-1 w-full">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radhe Shyam Restaurant | Fresh • Authentic • Everyday",
  description: "Authentic Indian food in Faridabad. Chole Bhature, Samosa, Kachori, Lassi and more. Order online with free delivery within 1 km!",
  keywords: ["Radhe Shyam Restaurant", "Faridabad", "Indian food", "Chole Bhature", "Samosa", "Delivery"],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

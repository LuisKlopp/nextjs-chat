import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import { jua } from "@/public/fonts/fonts";
import MainLayout from "@/components/main-layout";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "퍼넥션 그라운드",
  description: "퍼넥션 그라운드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${jua.className}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans_KR  } from "next/font/google";
import "./globals.css";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Suspense } from "react";


const noto = Noto_Sans_KR({
  subsets: ["latin"], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "ShareDiary",
  description: "Share your day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
      variables: { colorPrimary: "#7AA1D2"}
    }}>
      <html>
        <body className={noto.className}>
          <Suspense>
            <ConvexClientProvider>
            <Toaster position="top-center" richColors/>
            <ModalProvider />
              {children}
            </ConvexClientProvider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Inter, K2D } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const k2d = K2D({
  subsets: ["latin"],
  weight: ["100","200","300","400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "PowerPath",
  description: "For all your gym buddies",
};

export default function Layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={k2d.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

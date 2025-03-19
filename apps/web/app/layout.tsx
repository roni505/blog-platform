import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { BlogStoreProvider } from "../stores/store-provider";
import AppNavBar from "../ui/app-navbar";

const sourceSerif = Source_Serif_4({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vaani - Your Blogging Space",
  description: "Write, share, and explore blogs effortlessly with a seamless and engaging experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSerif.className}>
        <AppNavBar />
        <BlogStoreProvider>
          {children}
        </BlogStoreProvider>
      </body>
    </html>
  );
}

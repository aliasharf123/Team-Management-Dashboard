import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { Providers } from "@/components/nextuiProveder";
import { MantineProvider } from "@mantine/core";
import { cn } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Management Dashboard",
  description: "Made by Ali ashraf ali (Weka)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          " dark:text-white bg-background bg-radial"
        )}
      >
        <Providers>
          <MantineProvider>{children}</MantineProvider>
        </Providers>
      </body>
    </html>
  );
}

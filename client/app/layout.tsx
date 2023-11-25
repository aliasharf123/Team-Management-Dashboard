import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
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
      <body className={inter.className}>
        <MantineProvider  defaultColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}

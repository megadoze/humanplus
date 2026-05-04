import type { Metadata } from "next";
import { Exo_2, Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
});

const exo = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "Exoskeleton Solutions | Human+",
  description:
    "Помогаем компаниям уменьшить травмы и усталость сотрудников с помощью промышленных экзоскелетов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${space.variable} ${exo.variable} ${orbitron.className}`}
      >
        {children}
      </body>
    </html>
  );
}

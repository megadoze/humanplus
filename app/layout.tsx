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
  title:
    "Экзоскелеты для снижения нагрузки и роста производительности | Human+",

  description:
    "Снижайте нагрузку на сотрудников до 40% и повышайте производительность с помощью промышленных экзоскелетов Human+. Тест без риска за 7 дней.",

  keywords: [
    "экзоскелет",
    "промышленные экзоскелеты",
    "снижение нагрузки сотрудников",
    "эргономика труда",
    "производительность сотрудников",
    "экзоскелет для спины",
    "warehouse exoskeleton",
  ],

  openGraph: {
    title: "Экзоскелеты для бизнеса | Human+",
    description:
      "До 40% снижения нагрузки и рост производительности. Тестируйте экзоскелеты в реальной работе за 7 дней.",
    url: "https://humanplus.work",
    siteName: "Human+",
    images: [
      {
        url: "/images/suitx.avif",
        width: 1200,
        height: 630,
        alt: "Human+ Exoskeleton",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Экзоскелеты для бизнеса | Human+",
    description:
      "Снижение нагрузки до 40% и рост производительности сотрудников.",
    images: ["/images/suitx.avif"],
  },

  metadataBase: new URL("https://humanplus.work"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${space.variable} ${exo.variable} ${orbitron.className}`}
      >
        {children}
      </body>
    </html>
  );
}

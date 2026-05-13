import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const cabinet = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roop Sagar Studio — Freeze Time. Feel Everything.",
  description:
    "Ballia's most creative wedding & lifestyle photography studio. 450+ weddings, 12 years of real emotions. Book your session today.",
  keywords: [
    "wedding photography Ballia",
    "Roop Sagar Studio",
    "wedding photographer UP",
    "lifestyle photography Ballia",
    "pre-wedding shoot Ballia",
    "portrait photography Uttar Pradesh",
  ],
  authors: [{ name: "Roop Sagar Studio" }],
  openGraph: {
    title: "Roop Sagar Studio — Freeze Time. Feel Everything.",
    description:
      "Ballia's most creative wedding & lifestyle photography studio. 450+ weddings, 12 years of real emotions.",
    url: "https://roopsagarstudio.com",
    siteName: "Roop Sagar Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roop Sagar Studio",
    description: "Freeze Time. Feel Everything.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${cabinet.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

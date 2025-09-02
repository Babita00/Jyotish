import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-nepali",
});

export const metadata: Metadata = {
  title: "ज्योतिष परामर्श केन्द्र | Nepali Astrology Consultation",
  description:
    "Professional Nepali astrology consultation services. Get your Kundali reading, marriage matching, and career guidance from experienced astrologers.",
  keywords:
    "Nepali astrology, Kundali, Jyotish, marriage matching, career guidance, Nepal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${notoSansDevanagari.variable}`}
    >
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden`}
        style={{ backgroundColor: "#0b0d26" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

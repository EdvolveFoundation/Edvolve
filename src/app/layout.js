import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const siteDescription =
  "Edvolve Foundation discovers, supports, and facilitates solutions for education, human capital development, social change, and sustainable communities.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Edvolve Foundation",
  title: {
    default: "Edvolve Foundation",
    template: "%s | Edvolve Foundation",
  },
  description: siteDescription,
  keywords: [
    "Edvolve Foundation",
    "education foundation Nigeria",
    "human capital development",
    "social change",
    "sustainable communities",
    "youth empowerment",
    "MSME development",
    "agricultural development",
  ],
  authors: [{ name: "Edvolve Foundation" }],
  creator: "Edvolve Foundation",
  publisher: "Edvolve Foundation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Edvolve Foundation",
    title: "Edvolve Foundation",
    description: siteDescription,
    images: [
      {
        url: "/logo.png",
        width: 545,
        height: 569,
        alt: "Edvolve Foundation logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Edvolve Foundation",
    description: siteDescription,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

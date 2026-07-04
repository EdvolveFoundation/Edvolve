import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: {
    default: "Edvolve Foundation",
    template: "%s | Edvolve Foundation",
  },
  description:
    "Edvolve Foundation discovers, supports, and facilitates solutions for education, human capital development, social change, and sustainable communities.",
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

import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap | Build skills. Shape what's next.",
  description:
    "Career-focused software and technology education to help the next generation of engineers and developers thrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

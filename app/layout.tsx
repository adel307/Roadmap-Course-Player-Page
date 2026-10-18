import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeBackground } from "@/components/layout/theme-background";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Roadmap Academy",
  description:
    "Career-focused software and technology education to help the next generation of engineers and developers thrive.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen w-full bg-page text-ink">
        <div className="relative flex min-h-screen flex-col">
          <Providers>
            <ThemeBackground />
            <div className="pointer-events-none fixed inset-0 z-0 bg-page/95" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}

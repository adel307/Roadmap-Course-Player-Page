import Link from "next/link";
import {
  Play,
  ArrowLeft,
  Home,
  HelpCircle,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] font-sans text-[#1B2A3F] antialiased flex flex-col justify-between">
      {/* Main 404 Error Content */}
      <main className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Error Info & Actions */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-block rounded-full bg-[#E6F5F0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2BAE8E]">
              Error 404 • Page Not Found
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-[#1B2A3F] sm:text-5xl">
              Oops! This page took a wrong turn.
            </h1>

            <p className="text-base leading-relaxed text-[#5B6B7F] max-w-xl">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track to becoming an IT Legend.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-[10px] bg-[#E8174F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d01344] active:scale-[0.98]"
              >
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-[10px] border border-[#2BAE8E] bg-white px-6 py-3 text-sm font-semibold text-[#2BAE8E] transition-all hover:bg-[#E6F5F0] active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Browse Courses</span>
              </Link>
            </div>

            <div className="pt-4 text-xs text-[#5B6B7F] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#2BAE8E]" />
              <span>Need help? Visit our <Link href="/support" className="underline hover:text-[#2BAE8E]">Support Center</Link></span>
            </div>
          </div>

          {/* Right Column: Preserved Video Player Container Style */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[16px] border border-[#E8EDF2] bg-[#1B2A3F] shadow-[0_1px_3px_rgba(16,24,40,0.05),0_4px_20px_rgba(16,24,40,0.04)]">
              <div className="relative aspect-video w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                
                {/* Background Image Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
                  alt="404 Illustration Background"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-80"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
                  Lost in Space
                </div>

                {/* Play Button Style preserved */}
                <button
                  aria-label="Play video"
                  className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#E8174F] shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-8 ring-white/20 transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Play className="h-8 w-8 fill-[#E8174F] ml-1 transition-transform group-hover:scale-110" />
                </button>

                {/* Duration / Status Meta */}
                <div className="absolute bottom-4 right-4 rounded-md bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">
                  Error Code
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-[#E8EDF2] bg-white py-6 text-center text-xs text-[#5B6B7F]">
        <p>&copy; {new Date().getFullYear()} IT Legend. All rights reserved.</p>
      </footer>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, VideoOff } from "lucide-react";

type VideoSource =
  | { kind: "youtube"; embedUrl: string }
  | { kind: "vimeo"; embedUrl: string }
  | { kind: "file"; src: string };

function getYouTubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") return url.pathname.slice(1) || null;

  if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const match = url.pathname.match(/^\/(embed|shorts|live)\/([^/?]+)/);
    if (match) return match[2];
  }
  return null;
}

function getVimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  const match = url.pathname.match(/(\d+)/);
  return match ? match[1] : null;
}

function resolveVideoSource(rawUrl: string | null | undefined): VideoSource | null {
  if (!rawUrl) return null;

  // مسار محلي مثل /videos/intro.mp4
  if (rawUrl.startsWith("/")) return { kind: "file", src: rawUrl };

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`,
    };
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return {
      kind: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
    };
  }

  return { kind: "file", src: rawUrl };
}

type Props = {
  title: string;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
};

export function CoursePromoPlayer({ title, thumbnailUrl, videoUrl }: Props) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const source = resolveVideoSource(videoUrl);
  const canPlay = source !== null && !failed;

  const handlePlay = () => setPlaying(true);

  const handleVideoError = () => {
    setFailed(true);
    setPlaying(false);
  };

  

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-[#1b2a3f] shadow-card">
      {playing && source ? (
        source.kind === "file" ? (
          <video
            src={source.src}
            poster={thumbnailUrl ?? undefined}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={handleVideoError}
            className="absolute inset-0 h-full w-full bg-black"
          />
        ) : (
          <iframe
            src={source.embedUrl}
            title={`${title} - preview`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        )
      ) : (
        <>
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover opacity-90"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-[#1b2a3f]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            Course preview
          </span>

          {canPlay ? (
            <button
              type="button"
              aria-label="Play preview video"
              onClick={handlePlay}
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-8 ring-white/20 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-brand"
            >
              <PlayCircle size={36} className="text-brand-dark" />
            </button>
          ) : (
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <VideoOff size={14} />
              {failed ? "Video failed to load" : "No preview video yet"}
            </div>
          )}
        </>
      )}
    </div>
  );
}
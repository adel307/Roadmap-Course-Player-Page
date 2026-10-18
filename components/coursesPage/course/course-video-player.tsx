"use client";

import Image from "next/image";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef } from "react";

interface CourseVideoPlayerProps {
  lessonTitle: string;
  isPlaying: boolean;
  currentTimeSeconds: number;
  durationSeconds: number;
  muted: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onToggleMute: () => void;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function CourseVideoPlayer({
  lessonTitle,
  isPlaying,
  currentTimeSeconds,
  durationSeconds,
  muted,
  onTogglePlay,
  onSeek,
  onToggleMute,
}: CourseVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const progress = durationSeconds
    ? (currentTimeSeconds / durationSeconds) * 100
    : 0;

  return (
    <div
      ref={playerRef}
      className="group relative aspect-video overflow-hidden rounded-2xl bg-[#152129] shadow-card"
    >
      <Image
        src="/images/course-video-poster.png"
        alt="Instructor presenting an online lesson"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 70vw"
        className={`object-cover transition duration-500 ${isPlaying ? "scale-[1.025] brightness-75" : "brightness-90"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      <div className="absolute left-4 top-4 max-w-[75%] truncate rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:left-6 sm:top-5">
        {lessonTitle}
      </div>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause lesson" : "Play lesson"}
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-rose-500 shadow-xl transition hover:scale-105 sm:h-[68px] sm:w-[68px]"
      >
        {isPlaying ? (
          <Pause size={23} fill="currentColor" />
        ) : (
          <Play size={23} fill="currentColor" className="ml-1" />
        )}
      </button>

      {isPlaying && (
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
          Preview playing
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-10 text-white sm:px-6 sm:pb-4">
        <input
          aria-label="Seek lesson"
          type="range"
          min={0}
          max={durationSeconds}
          value={currentTimeSeconds}
          onChange={(event) => onSeek(Number(event.target.value))}
          className="range-input mb-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/50"
          style={{
            background: `linear-gradient(to right, #31b29c ${progress}%, rgba(255,255,255,.55) ${progress}%)`,
          }}
        />
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause lesson" : "Play lesson"}
              className="rounded p-1 transition hover:bg-white/15"
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <span className="tabular-nums">
              {formatTime(currentTimeSeconds)} / {formatTime(durationSeconds)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={muted ? "Unmute lesson" : "Mute lesson"}
              onClick={onToggleMute}
              className="rounded p-1 transition hover:bg-white/15"
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button
              type="button"
              aria-label="Enter fullscreen"
              onClick={() => void playerRef.current?.requestFullscreen()}
              className="rounded p-1 transition hover:bg-white/15"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

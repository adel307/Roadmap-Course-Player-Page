export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  return `${secs}s`;
}

/** Convert a YouTube watch, short, or embed URL to an embed URL. */
export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    let videoId = "";

    if (urlObj.hostname.includes("youtube.com")) {
      if (urlObj.pathname.startsWith("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1];
      } else if (urlObj.pathname.startsWith("/shorts/")) {
        videoId = urlObj.pathname.split("/shorts/")[1];
      } else {
        videoId = urlObj.searchParams.get("v") ?? "";
      }
    } else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    }

    // Strip any additional query parameters.
    videoId = videoId.split("?")[0].split("&")[0];

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(url: string): string | null {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;
  const videoId = embedUrl.split("/embed/")[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
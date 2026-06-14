export type VideoEmbedKind = "youtube" | "vimeo" | "direct" | "unknown";

export interface ParsedVideoUrl {
  kind: VideoEmbedKind;
  /** iframe src for YouTube/Vimeo, or direct file URL for native video */
  embedUrl: string;
}

const DIRECT_VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?|$)/i;

function extractYouTubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return id || null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const shorts = url.pathname.match(/^\/shorts\/([^/?]+)/);
    if (shorts) return shorts[1];
    const embed = url.pathname.match(/^\/embed\/([^/?]+)/);
    if (embed) return embed[1];
  }
  return null;
}

function extractVimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  const match = url.pathname.match(/\/(\d+)/);
  return match?.[1] ?? null;
}

/** Parse a testimonial video URL into an embeddable source. */
export function parseVideoUrl(raw: string): ParsedVideoUrl | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (DIRECT_VIDEO_EXT.test(trimmed)) {
    return { kind: "direct", embedUrl: trimmed };
  }

  try {
    const url = new URL(trimmed);
    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      return {
        kind: "youtube",
        embedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`,
      };
    }

    const vimeoId = extractVimeoId(url);
    if (vimeoId) {
      return {
        kind: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      };
    }
  } catch {
    return null;
  }

  return null;
}

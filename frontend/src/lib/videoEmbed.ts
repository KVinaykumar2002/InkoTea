export type VideoEmbedKind =
  | "youtube"
  | "vimeo"
  | "instagram"
  | "facebook"
  | "direct"
  | "unknown";

export interface ParsedVideoUrl {
  kind: VideoEmbedKind;
  /** iframe src for hosted players, or direct file URL for native video */
  embedUrl: string;
  /** CSS padding-top % for the responsive wrapper (default 16:9). */
  aspectPadding?: string;
}

const DIRECT_VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?|$)/i;

const SUPPORTED_VIDEO_HINT =
  "YouTube, Instagram, Facebook, Vimeo, or a direct MP4/WebM link";

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

function extractInstagramEmbed(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "instagram.com") return null;

  const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([^/?#]+)/i);
  if (!match) return null;

  const segment = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
  return `https://www.instagram.com/${segment}/${match[2]}/embed`;
}

function isFacebookHost(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "").replace(/^m\./, "");
  return host === "facebook.com" || host === "fb.watch" || host === "fb.com";
}

function buildFacebookEmbed(url: URL): string | null {
  if (!isFacebookHost(url.hostname)) return null;

  const href = encodeURIComponent(url.toString());
  return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&width=560`;
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

    const instagramEmbed = extractInstagramEmbed(url);
    if (instagramEmbed) {
      return {
        kind: "instagram",
        embedUrl: instagramEmbed,
        aspectPadding: "125%",
      };
    }

    const facebookEmbed = buildFacebookEmbed(url);
    if (facebookEmbed) {
      return {
        kind: "facebook",
        embedUrl: facebookEmbed,
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

export { SUPPORTED_VIDEO_HINT };

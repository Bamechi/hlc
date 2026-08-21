export const HLC_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLXa8HXFcKT94-5I_FVD23rEzohplSf2-x";

export function isValidVideoId(videoId: string | null): videoId is string {
  return typeof videoId === "string" && /^[A-Za-z0-9_-]{11}$/.test(videoId);
}

export async function isVideoAvailable(videoId: string) {
  try {
    const episodeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(episodeUrl)}&format=json`,
      { headers: { Accept: "application/json" } },
    );

    return response.ok;
  } catch {
    return false;
  }
}

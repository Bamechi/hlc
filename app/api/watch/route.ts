import { HLC_PLAYLIST_URL, isValidVideoId, isVideoAvailable } from "../youtube";

export async function GET(request: Request) {
  const videoId = new URL(request.url).searchParams.get("videoId");

  if (!isValidVideoId(videoId) || !(await isVideoAvailable(videoId))) {
    return Response.redirect(HLC_PLAYLIST_URL, 302);
  }

  return Response.redirect(`https://www.youtube.com/watch?v=${videoId}`, 302);
}

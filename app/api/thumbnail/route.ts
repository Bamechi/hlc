import { isValidVideoId, isVideoAvailable } from "../youtube";

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

export async function GET(request: Request) {
  const videoId = new URL(request.url).searchParams.get("videoId");

  if (!isValidVideoId(videoId) || !(await isVideoAvailable(videoId))) {
    return redirect(new URL("/assets/portrait-mind.webp", request.url).toString());
  }

  return redirect(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
}

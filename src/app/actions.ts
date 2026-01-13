"use server";

import { getTVShowEpisodeVideos, Video } from "@/services/tmdb";

export async function getEpisodeVideosAction(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<Video[]> {
  const videos = await getTVShowEpisodeVideos(
    tvId,
    seasonNumber,
    episodeNumber
  );
  return videos;
}

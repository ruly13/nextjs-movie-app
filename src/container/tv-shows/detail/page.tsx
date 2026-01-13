import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { getTVShowDetail, getTVShowVideos, getTVShowCredits, getTVShowRecommendations, getTVShowEpisodes } from "@/services/tmdb";
import { TVShowDetailHero } from "./TVShowDetailHero";
import { TVShowEpisodes } from "./TVShowEpisodes";
import { TVShowCast } from "./TVShowCast";
import { TVShowInfo } from "./TVShowInfo";
import { TVShowRecommendations } from "./TVShowRecommendations";

interface TVShowDetailContainerProps {
  id: string;
}

export default async function TVShowDetailContainer({ id }: TVShowDetailContainerProps) {
  const [show, videos, credits, recommendations, episodes] = await Promise.all([
    getTVShowDetail(id),
    getTVShowVideos(id),
    getTVShowCredits(id),
    getTVShowRecommendations(id),
    getTVShowEpisodes(id, 1), // Default to season 1 for now
  ]);

  if (!show) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        <h1 className="text-2xl">TV Show not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212]">
      <Navbar />
      <TVShowDetailHero 
        show={show} 
        crew={credits?.crew || []} 
        videos={videos} 
      />
      <TVShowEpisodes show={show} episodes={episodes} />
      <TVShowCast cast={credits?.cast || []} />
      <TVShowInfo show={show} />
      <TVShowRecommendations recommendations={recommendations} />
      <Footer />
    </main>
  );
}

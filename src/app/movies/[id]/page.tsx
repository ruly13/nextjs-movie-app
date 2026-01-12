import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { MovieDetailHero } from "@/container/movies/detail/MovieDetailHero";
import { MovieCast } from "@/container/movies/detail/MovieCast";
import { MovieRecommendations } from "@/container/movies/detail/MovieRecommendations";
import { getMovieDetail, getMovieCredits, getMovieRecommendations, getMovieVideos } from "@/services/tmdb";
import { notFound } from "next/navigation";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  
  const [movie, credits, recommendations, videos] = await Promise.all([
    getMovieDetail(id),
    getMovieCredits(id),
    getMovieRecommendations(id),
    getMovieVideos(id)
  ]);

  if (!movie) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <MovieDetailHero movie={movie} crew={credits?.crew || []} videos={videos} />

        {/* Content Container */}
        <div className="container mx-auto px-4 md:px-8 space-y-12 mt-8 md:mt-12 pb-12">
             <MovieCast cast={credits?.cast || []} />
             <MovieRecommendations recommendations={recommendations} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

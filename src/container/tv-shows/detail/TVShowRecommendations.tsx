"use client";

import { MovieCard } from "@/container/home/components/MovieCard";
import { Movie, getImageUrl } from "@/services/tmdb";

interface TVShowRecommendationsProps {
  recommendations: Movie[];
}

export function TVShowRecommendations({ recommendations }: TVShowRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 border-t border-white/5">
      <h3 className="text-2xl font-bold text-white mb-8">More Like This</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recommendations.slice(0, 5).map((show) => (
           <MovieCard 
              key={show.id}
              id={show.id}
              title={show.name || show.title || "Untitled"}
              year={new Date(show.first_air_date || show.release_date || "").getFullYear().toString()}
              rating={show.vote_average}
              imageUrl={getImageUrl(show.poster_path)}
              mediaType="tv"
              className="w-full"
            />
        ))}
      </div>
    </section>
  );
}

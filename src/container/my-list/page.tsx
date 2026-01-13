"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { WatchlistFilters } from "./components/WatchlistFilters";
import { WatchlistCard } from "./components/WatchlistCard";
import { Movie, Genre } from "@/services/tmdb";
import { ChevronDown } from "lucide-react";

interface MyListPageContainerProps {
  initialMovies: Movie[];
  initialTVShows: Movie[]; // Using Movie type for TV shows as defined in tmdb.ts service (name vs title handled)
  genres: Genre[];
  tvGenres: Genre[];
}

export default function MyListPageContainer({ 
  initialMovies, 
  initialTVShows,
  genres,
  tvGenres
}: MyListPageContainerProps) {
  const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("movie"); // Default to 'movie' as in design screenshot 'Movies' is selected

  // Helper to map genre IDs to names
  const getGenreNames = (ids: number[] | undefined, type: "movie" | "tv") => {
    if (!ids) return [];
    const genreList = type === "movie" ? genres : tvGenres;
    return ids
      .map(id => genreList.find(g => g.id === id)?.name)
      .filter(Boolean) as string[];
  };

  // Prepare data
  const moviesWithMeta = initialMovies.map(m => ({
    ...m,
    mediaType: "movie" as const,
    displayGenres: getGenreNames(m.genre_ids, "movie"),
     // Mock runtime based on ID to be deterministic but varied for UI demo
    runtime: `${(m.id % 3) + 1}h ${(m.id % 50) + 10}m`
  }));

  const tvShowsWithMeta = initialTVShows.map(t => ({
    ...t, 
    mediaType: "tv" as const,
    displayGenres: getGenreNames(t.genre_ids, "tv"),
    runtime: `${(t.id % 4) + 1} Seasons`
  }));

  // Filter content
  const content = useMemo(() => {
    if (activeTab === "movie") return moviesWithMeta;
    if (activeTab === "tv") return tvShowsWithMeta;
    return [...moviesWithMeta, ...tvShowsWithMeta].sort((a, b) => b.vote_average - a.vote_average);
  }, [activeTab, moviesWithMeta, tvShowsWithMeta]);

  return (
    <main className="min-h-screen bg-[#121212] flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 md:px-8 py-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">My Watchlist</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Your personalized collection. Keep track of every movie and TV show you want to see.
          </p>
        </div>

        {/* Filters */}
        <WatchlistFilters 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {content.map((item) => (
            <WatchlistCard
              key={`${item.mediaType}-${item.id}`}
              id={item.id}
              title={item.title || item.name || "Untitled"}
              year={new Date(item.release_date || item.first_air_date || "").getFullYear().toString()}
              rating={item.vote_average}
              imageUrl={item.poster_path}
              mediaType={item.mediaType}
              genres={item.displayGenres}
              runtime={item.runtime}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-16">
            <button className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] text-white px-8 py-3 rounded-full font-medium transition-all group border border-white/10 hover:border-white/20">
                Load More
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

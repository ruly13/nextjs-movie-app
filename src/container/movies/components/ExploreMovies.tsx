
"use client";

import { MovieCard } from "@/container/home/components/MovieCard";
import { Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Genre, Movie, getImageUrl } from "@/services/tmdb";
import { fetchMoviesByGenre } from "../actions";

interface ExploreMoviesProps {
    initialMovies: Movie[];
    genres: Genre[];
}

export function ExploreMovies({ initialMovies, genres }: ExploreMoviesProps) {
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null); // null means "All"
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const handleGenreChange = async (genreId: number | null) => {
    if (activeGenreId === genreId) return;
    
    setActiveGenreId(genreId);
    setIsLoading(true);
    // Reset sort when changing genre
    setSortBy("popularity.desc");
    
    try {
      const newMovies = await fetchMoviesByGenre(genreId, "popularity.desc");
      setMovies(newMovies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortOptionClick = async (newSort: string) => {
    if (sortBy === newSort) return;
    
    setSortBy(newSort);
    setIsLoading(true);

    try {
      const newMovies = await fetchMoviesByGenre(activeGenreId, newSort);
      setMovies(newMovies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSortLabel = () => {
    if (sortBy === "vote_average.desc") return "Top Rated";
    if (sortBy === "primary_release_date.desc") return "Newest";
    return "Sort";
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white">Explore Movies</h2>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button
              onClick={() => handleGenreChange(null)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeGenreId === null
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              All Genres
            </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                activeGenreId === genre.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <div className="relative group shrink-0">
          <button 
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              sortBy !== "popularity.desc" 
                ? "bg-white text-black hover:bg-white/90" 
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            )}
          >
            <Filter className={cn("w-3 h-3", sortBy !== "popularity.desc" && "fill-current")} />
            {getSortLabel()}
          </button>
          <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl shadow-black/50 overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
            <div className="p-1">
              {[
                { label: "Popular", value: "popularity.desc" },
                { label: "Top Rated", value: "vote_average.desc" },
                { label: "Newest", value: "primary_release_date.desc" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortOptionClick(option.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    sortBy === option.value
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
         <div className="flex items-center justify-center h-40">
           <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
         </div>
      ) : (
        <div className="flex overflow-x-auto pb-6 gap-4 scrollbar-hide snap-x md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-6 md:overflow-visible">
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start shrink-0 w-[160px] md:w-auto">
              <MovieCard 
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name || "Untitled"}
                year={new Date(movie.release_date || movie.first_air_date || "").getFullYear().toString()}
                rating={movie.vote_average}
                imageUrl={getImageUrl(movie.poster_path)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 flex justify-center">
        <div className="flex flex-col items-center gap-3">
          {isLoading ? (
             <p className="text-gray-500 text-sm">Updating...</p>
          ) : (
             <>
                {/* Visual filler for "Load More" - functionality not requested yet */}
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin opacity-0" />
                <p className="text-gray-500 text-sm">Loading more movies...</p>
             </>
          )}
        </div>
      </div>
    </section>
  );
}

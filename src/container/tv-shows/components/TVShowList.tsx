"use client";

import { MovieCard } from "@/container/home/components/MovieCard";
import { Movie, getImageUrl, Genre } from "@/services/tmdb";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

interface TVShowListProps {
  title: string;
  initialMovies: Movie[];
  genres: Genre[];
  currentSort: string;
}

export function TVShowList({ title, initialMovies, genres, currentSort }: TVShowListProps) {
  const [activeGenre, setActiveGenre] = useState<number | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const router = useRouter();

  const handleSortChange = (value: string) => {
    router.push(`/tv-shows?sort=${value}`);
    setIsSortOpen(false);
  };

  const sortOptions = [
    { label: "Popularity", value: "popularity" },
    { label: "Top Rated", value: "top_rated" },
    { label: "On The Air", value: "on_the_air" },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label || "Popularity";

  // Filter movies if activeGenre is set
  const filteredMovies = activeGenre 
    ? initialMovies.filter(movie => movie.genre_ids?.includes(activeGenre))
    : initialMovies;

  return (
    <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-white">TV Shows</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
                <p className="text-gray-400 mt-2">Discover your next obsession from thousands of TV series.</p>
            </div>

            <div className="relative mr-6 z-20">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-[#2d2525] hover:bg-[#3d3333] text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-white/5 min-w-[140px] justify-between"
                >
                    {currentSortLabel}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-[#2d2525] border border-white/10 rounded shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${currentSort === option.value ? "text-red-500 font-bold" : "text-gray-300"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
        </div>

        {/* Categories / Genres Pills */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide snap-x">
            <button 
                onClick={() => setActiveGenre(null)}
                className={`flex-shrink-0 px-5 py-1.5 rounded-full text-xs font-bold transition-all snap-start ${activeGenre === null ? 'bg-[#E50914] text-white' : 'bg-[#2d2525] text-gray-300 hover:bg-[#3d3333]'}`}
            >
                All Genres
            </button>
            {genres.map(genre => (
                <button 
                    key={genre.id}
                    onClick={() => setActiveGenre(genre.id)}
                    className={`flex-shrink-0 px-5 py-1.5 rounded-full text-xs font-medium transition-all snap-start ${activeGenre === genre.id ? 'bg-white text-black' : 'bg-[#2d2525] text-gray-300 hover:bg-[#3d3333]'}`}
                >
                    {genre.name}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
            {filteredMovies.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    id={movie.id}
                    title={movie.name || "Untitled"}
                    year={new Date(movie.first_air_date || "").getFullYear().toString()}
                    rating={movie.vote_average}
                    imageUrl={getImageUrl(movie.poster_path)}
                    mediaType="tv"
                    className="w-full"
                />
            ))}
        </div>
        
        {/* Load More Mock */}
        <div className="flex justify-center mt-16">
            <div className="flex flex-col items-center gap-2 text-gray-500 animate-pulse">
                 <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                 <span className="text-sm">Loading more shows...</span>
            </div>
        </div>
    </section>
  );
}

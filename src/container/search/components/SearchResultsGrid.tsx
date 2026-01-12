"use client";

import { MovieCard } from "@/container/home/components/MovieCard";
import Link from "next/link";
import NextImage from "next/image";
import { Movie, getImageUrl } from "@/services/tmdb";
import { cn } from "@/lib/utils";

interface SearchResultsGridProps {
    movies: Movie[];
    viewMode: "grid" | "list";
}

export function SearchResultsGrid({ movies, viewMode }: SearchResultsGridProps) {
    if (movies.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p>Try ensuring your spelling is correct or try a different term.</p>
            </div>
        );
    }

    return (
        <div className={cn(
            "grid gap-6 gap-y-10",
            viewMode === "grid" 
                ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" 
                : "grid-cols-1"
        )}>
            {movies.map((movie) => (
                <div key={movie.id} className="w-full">
                    {viewMode === "grid" ? (
                        <MovieCard 
                            id={movie.id}
                            title={movie.title || movie.name || "Untitled"}
                            year={new Date(movie.release_date || movie.first_air_date || "").getFullYear().toString()}
                            rating={movie.vote_average}
                            imageUrl={getImageUrl(movie.poster_path)}
                            className="w-full"
                        />
                    ) : (
                       // Simple list view implementation
                       <Link href={`/movies/${movie.id}`}>
                           <div className="flex gap-4 bg-zinc-900/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                                <div className="w-[100px] aspect-[2/3] shrink-0 relative rounded-lg overflow-hidden">
                                    <NextImage src={getImageUrl(movie.poster_path)} alt={movie.title || "Movie poster"} fill className="object-cover" />
                                </div>
                                <div className="flex-1 py-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{movie.title || movie.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                        <span>{new Date(movie.release_date || movie.first_air_date || "").getFullYear()}</span>
                                        <span>•</span>
                                        <span className="text-yellow-500 font-bold">★ {movie.vote_average.toFixed(1)}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-3 md:line-clamp-4">{movie.overview}</p>
                                </div>
                           </div>
                       </Link>
                    )}
                </div>
            ))}
        </div>
    );
}

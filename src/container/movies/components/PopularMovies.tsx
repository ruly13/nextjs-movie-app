
import { MovieCard } from "@/container/home/components/MovieCard";
import { ChevronRight } from "lucide-react";
import { Movie, getImageUrl } from "@/services/tmdb";

interface PopularMoviesProps {
    movies: Movie[];
}

export function PopularMovies({ movies }: PopularMoviesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
        <button className="text-sm font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors">
          See all <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex overflow-x-auto pb-6 gap-4 scrollbar-hide snap-x md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-8 md:overflow-visible">
        {movies.slice(0, 12).map((movie) => (
          <div key={movie.id} className="snap-start shrink-0 w-[160px] md:w-auto">
            <MovieCard 
              title={movie.title || movie.name || "Untitled"}
              year={new Date(movie.release_date || movie.first_air_date || "").getFullYear().toString()}
              rating={movie.vote_average}
              imageUrl={getImageUrl(movie.poster_path)}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

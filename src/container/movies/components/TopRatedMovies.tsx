
import { MovieCard } from "@/container/home/components/MovieCard";
import { Movie, getImageUrl } from "@/services/tmdb";

interface TopRatedMoviesProps {
    movies: Movie[];
}

export function TopRatedMovies({ movies }: TopRatedMoviesProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Top Rated</h2>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-4 border-l border-gray-700">Critics Choice</span>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x">
        {movies.slice(0, 10).map((movie, index) => (
          <div key={movie.id} className="snap-start shrink-0 w-[160px] md:w-[200px] relative pl-8">
            <span className="absolute left-0 -bottom-6 text-[100px] font-bold text-gray-800/40 z-0 select-none leading-none font-outline-2">
              {index + 1}
            </span>
            <div className="relative z-10 transition-transform hover:z-20">
               <MovieCard 
                id={movie.id}
                title={movie.title || movie.name || "Untitled"}
                year={new Date(movie.release_date || movie.first_air_date || "").getFullYear().toString()}
                rating={movie.vote_average}
                imageUrl={getImageUrl(movie.poster_path)}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

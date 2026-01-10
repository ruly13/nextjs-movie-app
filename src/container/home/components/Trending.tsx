import Link from "next/link";
import { getTrendingMovies, getImageUrl } from "@/services/tmdb";
import { MovieCard } from "./MovieCard";

interface TrendingProps {
  timeWindow?: "day" | "week";
}

export async function Trending({ timeWindow = "day" }: TrendingProps) {
  const movies = await getTrendingMovies(timeWindow);

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-red-600 rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
        </div>

        <div className="flex bg-white/5 border border-white/10 rounded-full p-1 w-fit">
          <Link
            href="?trending=day"
            className={`px-6 py-1.5 rounded-full text-sm font-semibold shadow-sm transition-all ${
              timeWindow === "day"
                ? "bg-red-600 text-white"
                : "text-muted-foreground hover:text-white"
            }`}
            scroll={false}
          >
            Today
          </Link>
          <Link
            href="?trending=week"
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${
              timeWindow === "week"
                ? "bg-red-600 text-white"
                : "text-muted-foreground hover:text-white"
            }`}
            scroll={false}
          >
            This Week
          </Link>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start shrink-0">
            <MovieCard
              title={movie.title || movie.name || "Unknown"}
              year={
                (movie.release_date || movie.first_air_date || "").split("-")[0] || "N/A"
              }
              rating={movie.vote_average}
              imageUrl={getImageUrl(movie.poster_path)}
              className="w-[160px] md:w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Movie, getImageUrl } from "@/services/tmdb";

interface MovieRecommendationsProps {
    recommendations: Movie[];
}

export function MovieRecommendations({ recommendations }: MovieRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Recommendations</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {recommendations.map((movie) => (
                <div key={movie.id} className="snap-start shrink-0 w-[250px] group cursor-pointer">
                    <Link href={`/movies/${movie.id}`}>
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                            <Image 
                                src={getImageUrl(movie.backdrop_path || movie.poster_path, "w500")} 
                                alt={movie.title || "Movie Recommendation"} 
                                fill 
                                className="object-cover transition-transform duration-300 group-hover:scale-110" 
                            />
                             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 text-xs text-white">
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                {movie.vote_average.toFixed(1)}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 px-1">
                            <p className="font-bold text-white text-sm truncate" title={movie.title || movie.name}>{movie.title || movie.name}</p>
                            <p className="text-xs text-gray-400">{Math.round(movie.vote_average * 10)}% Match</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
}

import { Play, Star, Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MovieDetail, Crew, getImageUrl } from "@/services/tmdb";

interface MovieDetailHeroProps {
  movie: MovieDetail;
  crew: Crew[];
}

export function MovieDetailHero({ movie, crew }: MovieDetailHeroProps) {
  const director = crew.find((member) => member.job === "Director");
  const producer = crew.find((member) => member.job === "Producer");
  const composer = crew.find((member) => member.job === "Original Music Composer" || member.job === "Music");

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString("en-US") : "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

  return (
    <div className="relative w-full min-h-[70vh] flex items-start bg-[#201A19] text-white pt-24 pb-12">
      {/* Background Image / Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(movie.backdrop_path, "original")} 
          alt={movie.title || "Movie Backdrop"}
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center">
        
        {/* Poster Image */}
        <div className="shrink-0 w-[200px] md:w-[300px] lg:w-[350px] aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl mx-auto md:mx-0">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title || "Movie Poster"}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          
          {/* Title Section */}
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              {movie.title} <span className="text-3xl md:text-5xl font-normal text-gray-400">({releaseYear})</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm md:text-base text-gray-300">
               {/* Certification placeholder - API doesn't provide this easily in details without append_to_response */}
               <span className="border border-white/60 px-1 rounded text-xs leading-5">PG-13</span> 
               <span className="flex items-center gap-1">
                 {formattedDate}
               </span>
               <span className="w-1 h-1 bg-white rounded-full" />
               <span>{movie.genres?.map(g => g.name).join(", ")}</span>
               <span className="w-1 h-1 bg-white rounded-full" />
               <span>{runtime}</span>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center flex-wrap gap-6">
            
            {/* User Score */}
            <div className="flex items-center gap-2">
                <div className="relative w-16 h-16 flex items-center justify-center bg-black rounded-full border-4 border-green-500/30">
                     <span 
                      className="absolute inset-0 border-4 border-green-500 rounded-full border-l-transparent rotate-45"
                      style={{ transform: `rotate(${movie.vote_average * 36}deg)` }} // Simple approximation for visual ring
                     />
                     <span className="font-bold text-white text-lg">{Math.round(movie.vote_average * 10)}<span className="text-xs align-top">%</span></span>
                </div>
                <div className="font-bold text-sm leading-tight">User<br/>Score</div>
            </div>

            {/* Play Trailer Button */}
             <button className="flex items-center gap-2 bg-[#CF3131] hover:bg-[#CF3131]/90 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 group">
              <Play className="fill-white w-4 h-4 group-hover:bg-transparent" />
              Play Trailer
            </button>

             {/* Action Icons */}
            <div className="flex items-center gap-4">
               <button className="w-10 h-10 rounded-full bg-[#032541] flex items-center justify-center hover:bg-[#032541]/80 transition-colors" title="Add to list">
                 <Bookmark className="w-4 h-4 text-white" />
               </button>
               <button className="w-10 h-10 rounded-full bg-[#032541] flex items-center justify-center hover:bg-[#032541]/80 transition-colors" title="Mark as favorite">
                 <Heart className="w-4 h-4 text-white" />
               </button>
               <button className="w-10 h-10 rounded-full bg-[#032541] flex items-center justify-center hover:bg-[#032541]/80 transition-colors" title="Rate It">
                 <Star className="w-4 h-4 text-white" />
               </button>
            </div>
          </div>

          {/* Tagline */}
          {movie.tagline && (
            <div className="italic text-gray-400 text-lg font-light">
              &quot;{movie.tagline}&quot;
            </div>
          )}

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl">
              {movie.overview}
            </p>
          </div>

          {/* Crew Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 max-w-4xl pt-4">
             {director && (
              <div>
                 <p className="font-bold text-sm">{director.name}</p>
                 <p className="text-xs text-gray-400">Director</p>
              </div>
             )}
             {producer && (
              <div>
                 <p className="font-bold text-sm">{producer.name}</p>
                 <p className="text-xs text-gray-400">Producer</p>
              </div>
             )}
             {composer && (
              <div>
                 <p className="font-bold text-sm">{composer.name}</p>
                 <p className="text-xs text-gray-400">Composer</p>
              </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}

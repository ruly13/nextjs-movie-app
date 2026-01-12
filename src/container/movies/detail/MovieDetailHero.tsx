"use client";

import { Play, Star, Heart, Bookmark, X, PlayCircle, Maximize, Volume2, Settings } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MovieDetail, Crew, Video, getImageUrl } from "@/services/tmdb";
import { useState, useEffect } from "react";

interface MovieDetailHeroProps {
  movie: MovieDetail;
  crew: Crew[];
  videos: Video[];
}

export function MovieDetailHero({ movie, crew, videos }: MovieDetailHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const director = crew.find((member) => member.job === "Director");
  const producer = crew.find((member) => member.job === "Producer");
  const composer = crew.find((member) => member.job === "Original Music Composer" || member.job === "Music");

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const formattedDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString("en-US") : "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";

  const trailers = videos.filter(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
  const primaryTrailer = trailers.find(v => v.type === "Trailer") || trailers[0];

  const handlePlayClick = () => {
    if (primaryTrailer) {
      setCurrentVideo(primaryTrailer);
      setIsModalOpen(true);
    }
  };

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
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
               <button 
                  onClick={handlePlayClick}
                  disabled={!primaryTrailer}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 group",
                    primaryTrailer 
                      ? "bg-[#CF3131] hover:bg-[#CF3131]/90 text-white cursor-pointer shadow-lg shadow-red-900/40" 
                      : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                  )}
               >
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

      {/* Video Modal */}
      {isModalOpen && currentVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-in fade-in duration-200">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col p-4 md:p-8 relative">
             {/* Header */}
             <div className="flex items-start justify-between mb-6 shrink-0 z-10">
                <div className="space-y-1">
                  <h2 className="text-xl md:text-3xl font-bold text-white">{movie.title}</h2>
                  <p className="text-gray-400 text-sm md:text-base">{currentVideo.name}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="group p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white transition-all border border-white/5"
                >
                  <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
             </div>

             {/* Main Video Player */}
             <div className="flex-1 w-full relative bg-black rounded-lg overflow-hidden shrink-0 min-h-0 mb-8 border border-white/5">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo.key}?autoplay=1&rel=0`}
                  title={currentVideo.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
             </div>

             {/* More Videos Section */}
             {trailers.length > 1 && (
               <div className="shrink-0 h-[140px] md:h-[160px] flex flex-col justify-end">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">More Videos</h3>
                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x items-center">
                   {trailers.filter(v => v.id !== currentVideo.id).map(video => (
                     <button
                       key={video.id}
                       onClick={() => handleVideoSelect(video)}
                       className="flex-shrink-0 w-[280px] md:w-[320px] flex gap-3 group text-left snap-start p-2 rounded-lg hover:bg-white/5 transition-colors"
                     >
                       <div className="relative w-32 md:w-40 aspect-video rounded-md overflow-hidden bg-gray-900 shrink-0 border border-white/10 group-hover:border-red-500/50 transition-colors">
                         <Image 
                           src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                           alt={video.name}
                           fill
                           className="object-cover transition-transform group-hover:scale-110 duration-500"
                         />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                            <PlayCircle className="w-8 h-8 text-white/80 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                         </div>
                       </div>
                       
                       <div className="flex flex-col justify-center min-w-0">
                          <p className="text-white text-sm font-bold line-clamp-2 group-hover:text-red-500 transition-colors leading-tight mb-1">
                            {video.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                             <span>{video.type}</span>
                             <span>•</span>
                             <span>{new Date(video.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                          </div>
                       </div>
                     </button>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>
      )}
    </>
  );
}

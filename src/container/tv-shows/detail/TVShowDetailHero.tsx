"use client";

import { Play, Star, Heart, Bookmark, X, PlayCircle, Plus, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MovieDetail, Crew, Video, getImageUrl } from "@/services/tmdb";
import { useState, useEffect } from "react";

interface TVShowDetailHeroProps {
  show: MovieDetail;
  crew: Crew[];
  videos: Video[];
}

export function TVShowDetailHero({ show, crew, videos }: TVShowDetailHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  // TV Shows usually have "Creator" or "Executive Producer" instead of Director
  const creator = crew.find((member) => member.job === "Creator" || member.job === "Executive Producer");
  const producer = crew.find((member) => member.job === "Producer");
  
  const firstAirYear = show.first_air_date ? new Date(show.first_air_date).getFullYear() : "N/A";
  const formattedDate = show.first_air_date ? new Date(show.first_air_date).toLocaleDateString("en-US") : "N/A";
  
  // Runtime for TV shows is often an array "episode_run_time", but our interface might just have runtime.
  // We'll try to handle what we can, or fallback.
  // @ts-ignore - episode_run_time might exist on the API response even if not in our strict interface yet
  const episodeRuntime = show.episode_run_time?.[0] || show.runtime; 
  const runtimeDisplay = episodeRuntime ? `${episodeRuntime}m` : "N/A";

  const trailers = videos.filter(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser" || v.type === "Opening Credits"));
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
            src={getImageUrl(show.backdrop_path, "original")} 
            alt={show.name || "TV Show Backdrop"}
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
              src={getImageUrl(show.poster_path)}
              alt={show.name || "TV Show Poster"}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            
            {/* Title Section */}
            {/* Title Section */}
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                {show.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                 <span className="text-[#46d369] font-bold">98% Match</span>
                 <span className="text-gray-400">{firstAirYear}</span>
                 <span className="border border-white/40 px-1 rounded-[2px] text-xs leading-5 bg-white/10 text-gray-300">TV-14</span>
                 <span className="text-gray-400">{show.number_of_seasons ? `${show.number_of_seasons} Seasons` : ""}</span> 
                 
                 {/* Genre Pills */}
                 {show.genres?.slice(0, 3).map(g => (
                    <span key={g.id} className="border border-white/40 rounded-full px-3 py-0.5 text-xs text-gray-300">
                        {g.name}
                    </span>
                 ))}
              </div>
            </div>

            {/* Overview */}
            <div className="max-w-3xl">
              <p className="text-white leading-relaxed text-base md:text-lg">
                {show.overview}
              </p>
            </div>

            {/* Actions Row */}
            <div className="flex items-center gap-4 pt-2">
               {/* Play Trailer Button */}
               <button 
                  onClick={handlePlayClick}
                  disabled={!primaryTrailer}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded font-bold transition-all transform hover:scale-105 active:scale-95",
                    primaryTrailer 
                      ? "bg-[#E50914] hover:bg-[#b8070f] text-white shadow-lg" 
                      : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                  )}
               >
                <Play className="fill-white w-5 h-5" />
                Play Trailer
              </button>

               {/* Add to List Button */}
               <button className="flex items-center gap-2 px-6 py-3 rounded font-bold bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white transition-all transform hover:scale-105 active:scale-95 border border-white/10">
                 <Plus className="w-5 h-5" />
                 Add to List
               </button>

               {/* Like Button */}
               <button className="p-3 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white transition-all transform hover:scale-105 active:scale-95 border border-white/10">
                 <ThumbsUp className="w-5 h-5" />
               </button>
            </div>

            {/* Tagline */}
            {show.tagline && (
              <div className="italic text-gray-400 text-lg font-light">
                &quot;{show.tagline}&quot;
              </div>
            )}

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Overview</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl">
                {show.overview}
              </p>
            </div>

            {/* Crew Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 max-w-4xl pt-4">
               {creator && (
                <div>
                   <p className="font-bold text-sm">{creator.name}</p>
                   <p className="text-xs text-gray-400">Creator / EP</p>
                </div>
               )}
               {producer && (
                <div>
                   <p className="font-bold text-sm">{producer.name}</p>
                   <p className="text-xs text-gray-400">Producer</p>
                </div>
               )}
            </div>

          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && currentVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full h-full max-w-7xl mx-auto flex flex-col p-4 md:p-8 relative">
             {/* Header */}
             <div className="flex items-start justify-between mb-6 shrink-0 z-10">
                <div className="space-y-1">
                  <h2 className="text-xl md:text-3xl font-bold text-white">{show.name}</h2>
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

"use client";

import { ChevronDown, PlayCircle, X } from "lucide-react";
import Image from "next/image";
import { getImageUrl, MovieDetail, Episode, Video } from "@/services/tmdb";
import { useState } from "react";
import { getEpisodeVideosAction } from "@/app/actions";

interface TVShowEpisodesProps {
  show: MovieDetail;
  episodes: Episode[];
}

export function TVShowEpisodes({ show, episodes }: TVShowEpisodesProps) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If no episodes or empty array
  if (!episodes || episodes.length === 0) {
    return null;
  }

  // Get current season number from the first episode or default to 1
  const seasonNumber = episodes[0]?.season_number || 1;

  // Determine which episodes to display
  const displayedEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 3);
  const hasMoreEpisodes = episodes.length > 3;

  const handlePlayEpisode = async (episode: Episode) => {
    setIsLoading(true);
    setPlayingEpisode(episode);
    
    try {
        const videos = await getEpisodeVideosAction(show.id, episode.season_number, episode.episode_number);
        const trailer = videos.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip")) || videos[0];
        
        if (trailer) {
            setVideoKey(trailer.key);
        } else {
            // Fallback for demo if no specific video found (common for individual episodes)
            // Use a search embed or show "No video found" logic
            // For now, we will set it to null and show a message or just not open modal?
            // Let's fallback to main show trailer or nothing.
            // Actually, playing "something" is better than nothing for a smoother UX.
            // Let's just set the state and let the modal handle 'videoKey' missing if we want.
            // Or better: clear videoKey.
            setVideoKey(null);
        }
    } catch (e) {
        console.error("Failed to fetch episode video", e);
        setVideoKey(null);
    } finally {
        setIsLoading(false);
    }
  };

  const closePlayer = () => {
      setPlayingEpisode(null);
      setVideoKey(null);
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Episodes</h3>
        </div>

        <div className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-4">
            <span className="font-bold text-white">Season {seasonNumber}</span> of <span className="text-white font-bold">{show.name}</span>
        </div>

        <div className="space-y-4">
            {displayedEpisodes.map((ep) => (
                <div 
                    key={ep.id} 
                    onClick={() => handlePlayEpisode(ep)}
                    className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                >
                    <div className="relative w-full md:w-[240px] aspect-video shrink-0 rounded-md overflow-hidden bg-gray-900 border border-white/5">
                        <Image
                            src={getImageUrl(ep.still_path || show.backdrop_path || show.poster_path, "w500")}
                            alt={ep.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-110 duration-700"
                        />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="w-10 h-10 text-white" />
                         </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-bold text-base md:text-lg group-hover:text-[#E50914] transition-colors">{ep.episode_number}. {ep.name}</h4>
                            <span className="text-xs text-gray-400 font-mono hidden md:block">{ep.runtime ? `${ep.runtime}m` : "N/A"}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">{ep.overview || "No description available."}</p>
                    </div>
                    
                    <span className="text-xs text-gray-400 font-mono md:hidden mt-2">{ep.runtime ? `${ep.runtime}m` : "N/A"}</span>
                </div>
            ))}
            
            {hasMoreEpisodes && (
                <div className="flex justify-center mt-8 border-t border-white/5 pt-4">
                    <button 
                        onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                        className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors group"
                    >
                        {showAllEpisodes ? "Show Less Episodes" : "Show All Episodes"}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllEpisodes ? "rotate-180" : ""}`} />
                    </button>
                </div>
            )}
        </div>

        {/* Episode Player Modal */}
        {playingEpisode && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200 p-4">
                <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
                        <div>
                             <h3 className="text-lg font-bold text-white">{playingEpisode.name}</h3>
                             <p className="text-xs text-gray-400">Episode {playingEpisode.episode_number}</p>
                        </div>
                        <button onClick={closePlayer} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X className="w-6 h-6 text-white" />
                        </button>
                    </div>
                    
                    <div className="aspect-video w-full bg-black flex items-center justify-center relative">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-400 text-sm">Loading stream...</p>
                            </div>
                        ) : videoKey ? (
                           <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                              title={playingEpisode.name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-red-500 font-bold mb-2">Video Unavailable</p>
                                <p className="text-gray-400 text-sm max-w-md mx-auto">
                                    We couldn&apos;t find a trailer specifically for this episode. 
                                    (Note: TMDB API often lacks individual episode clips).
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </section>
  );
}

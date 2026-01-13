"use client";

import { MovieDetail } from "@/services/tmdb";
import Image from "next/image";

interface TVShowInfoProps {
  show: MovieDetail;
}

export function TVShowInfo({ show }: TVShowInfoProps) {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 border-t border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#1a1a1a] rounded-lg p-6 border border-white/5">
         <div>
            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Status</span>
            <span className="text-white font-medium">{show.status}</span>
         </div>
         <div>
            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Network</span>
             {/* If we had network logos, we would put them here. For now text or generic netflix mock */}
             <div className="flex items-center gap-2">
                 <span className="text-red-600 font-bold">Netflix</span> 
                 {/* Only static mock for visual match to design if real network not available or simple text */}
             </div>
         </div>
         <div>
            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Original Language</span>
            <span className="text-white font-medium uppercase">{show.original_language}</span>
         </div>
         <div>
            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Type</span>
            <span className="text-white font-medium">Scripted</span>
         </div>
      </div>
    </div>
  );
}

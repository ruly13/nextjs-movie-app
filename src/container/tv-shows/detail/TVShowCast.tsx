"use client";

import Image from "next/image";
import { Cast } from "@/services/tmdb";
import { getImageUrl } from "@/services/tmdb";

interface TVShowCastProps {
  cast: Cast[];
}

export function TVShowCast({ cast }: TVShowCastProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 border-t border-white/5">
      <h3 className="text-2xl font-bold text-white mb-8">Cast & Crew</h3>
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {cast.slice(0, 6).map((member) => (
          <div key={member.id} className="flex flex-col items-center gap-2 w-28 md:w-32 text-center">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                <Image 
                    src={getImageUrl(member.profile_path, "w500")}
                    alt={member.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                <p className="text-gray-400 text-xs mt-1">{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

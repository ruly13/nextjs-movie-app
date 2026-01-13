"use client";

import { Play, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Movie, getImageUrl } from "@/services/tmdb";

interface TVShowHeroProps {
  show: Movie;
}

export function TVShowHero({ show }: TVShowHeroProps) {
  if (!show) return null;

  return (
    <div className="relative w-full h-[85vh] flex items-center bg-[#121212] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageUrl(show.backdrop_path, "original")}
          alt={show.name || "TV Show Hero"}
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 mt-20">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-3">
             <span className="bg-[#E50914] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
               Creating Buzz
             </span>
             <span className="text-green-400 font-bold text-sm">98% Match</span>
             <span className="text-gray-300 text-sm">2023</span>
             <span className="border border-white/40 text-[10px] px-1 rounded text-gray-300">TV-MA</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none drop-shadow-lg">
            {show.name}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 line-clamp-3 font-medium drop-shadow-md max-w-xl">
            {show.overview}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href={`/tv-shows/${show.id}`}
              className="flex items-center gap-2 bg-[#E50914] hover:bg-[#b00710] text-white px-8 py-3 rounded-lg font-bold transition-transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" />
              Play Trailer
            </Link>
            <Link
              href={`/tv-shows/${show.id}`}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold transition-transform hover:scale-105"
            >
              <Info className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

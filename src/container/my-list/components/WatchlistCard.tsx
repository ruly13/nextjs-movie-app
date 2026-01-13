"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/services/tmdb";

interface WatchlistCardProps {
  id: number;
  title: string;
  year: string;
  rating: number;
  imageUrl: string;
  genres: string[];
  runtime?: string; // Optional since API might not list it easily in list view
  mediaType: "movie" | "tv";
}

export function WatchlistCard({ 
  id, 
  title, 
  year, 
  rating, 
  imageUrl, 
  genres, 
  runtime, 
  mediaType 
}: WatchlistCardProps) {
  const href = mediaType === "movie" ? `/movies/${id}` : `/tv-shows/${id}`;
  
  // Format genres to show max 2
  const displayGenres = genres.slice(0, 2).join(" • ");
  const duration = runtime ? ` • ${runtime}` : "";

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border-[3px] border-transparent transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <Image 
          src={getImageUrl(imageUrl)} 
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-red-500 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-400 font-medium line-clamp-1">
          {year} • <span className="text-gray-400">{displayGenres}</span>{duration}
        </p>
      </div>
    </Link>
  );
}

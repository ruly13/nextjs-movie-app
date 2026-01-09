import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  title: string;
  year: string;
  rating: number;
  imageUrl: string;
  className?: string;
}

export function MovieCard({ title, year, rating, imageUrl, className }: MovieCardProps) {
  return (
    <div className={cn("group relative flex flex-col gap-2 cursor-pointer w-[150px] md:w-[200px]", className)}>
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-white/20">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="mt-2 text-start">
        <h3 className="font-bold text-base leading-tight group-hover:text-red-500 transition-colors line-clamp-1" title={title}>{title}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
    </div>
  );
}

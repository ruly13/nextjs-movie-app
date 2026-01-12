
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cast, getImageUrl } from "@/services/tmdb";

interface MovieCastProps {
  cast: Cast[];
}

export function MovieCast({ cast }: MovieCastProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Top Billed Cast</h3>
       </div>
       
       <div className="relative pb-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                {cast.slice(0, 10).map((member) => (
                    <div key={member.id} className="snap-start shrink-0 w-[140px] bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                        <div className="relative h-[175px] w-full">
                             <Image 
                              src={getImageUrl(member.profile_path, "w500")} 
                              alt={member.name} 
                              fill 
                              className="object-cover" 
                             />
                        </div>
                        <div className="p-3">
                            <p className="font-bold text-white text-sm line-clamp-2" title={member.name}>{member.name}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1" title={member.character}>{member.character}</p>
                        </div>
                    </div>
                ))}



            </div>
       </div>
    </div>
  );
}

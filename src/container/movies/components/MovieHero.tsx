
import { Play, Info } from "lucide-react";
import Image from "next/image";

export function MovieHero() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" // Dune Part Two Backdrop
          alt="Dune: Part Two"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 mt-20">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center px-3 py-1 bg-[#C1101E] rounded-md text-white text-[10px] font-bold tracking-wider uppercase mb-2 shadow-lg shadow-red-900/20">
            #1 Trending
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
            Dune: Part Two
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base text-gray-200 font-medium">
            <span className="text-green-400 font-bold">98% Match</span>
            <span>2024</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-xs">PG-13</span>
            <span>2h 46m</span>
            <span>Sci-Fi</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl drop-shadow-sm line-clamp-3 md:line-clamp-none">
            Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg active:scale-95">
              <Play className="fill-white w-5 h-5" />
              Watch Trailer
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold backdrop-blur-sm transition-all border border-white/10 hover:border-white/30">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

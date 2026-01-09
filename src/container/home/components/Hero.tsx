import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background with blur/dim effect */}
      {/* Background Masking Effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 z-10 bg-background/30 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md">
          Welcome.
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl drop-shadow-sm font-medium">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        <div className="w-full max-w-2xl relative mt-8">
          <input 
            type="text" 
            placeholder="Search for a movie, tv show, person..." 
            className="w-full h-12 pl-12 pr-32 rounded-full bg-white/95 text-black placeholder:text-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <button className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

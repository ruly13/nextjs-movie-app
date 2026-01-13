"use client";

import { ChevronDown, Filter } from "lucide-react";

interface WatchlistFiltersProps {
  activeTab: "all" | "movie" | "tv";
  onTabChange: (tab: "all" | "movie" | "tv") => void;
}

export function WatchlistFilters({ activeTab, onTabChange }: WatchlistFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
      {/* Type Filters */}
      <div className="flex items-center bg-[#1a1a1a] p-1 rounded-full border border-white/5">
        <button
          onClick={() => onTabChange("all")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === "all" 
              ? "bg-[#E50914] text-white shadow-lg shadow-red-900/20" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => onTabChange("movie")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === "movie" 
              ? "bg-[#E50914] text-white shadow-lg shadow-red-900/20" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => onTabChange("tv")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === "tv" 
              ? "bg-[#E50914] text-white shadow-lg shadow-red-900/20" 
              : "text-gray-400 hover:text-white"
          }`}
        >
          TV Shows
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-3 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg text-sm font-medium border border-white/10 hover:bg-[#252525] transition-colors min-w-[180px] justify-between">
          <span className="text-gray-400">Sort by:</span>
          <span>Date Added</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

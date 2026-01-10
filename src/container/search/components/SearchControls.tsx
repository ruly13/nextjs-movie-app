"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, LayoutGrid, List as ListIcon } from "lucide-react";

interface SearchControlsProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

export function SearchControls({ activeFilter, setActiveFilter, viewMode, setViewMode }: SearchControlsProps) {
    const filters = ["All Results", "Action", "Adventure", "Animation", "Crime", "Sci-Fi"];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                            activeFilter === filter
                                ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Sort & View Toggle */}
            <div className="flex items-center gap-3 shrink-0">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors">
                    Popularity Desc <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <div className="flex items-center bg-zinc-800 rounded-lg p-1">
                    <button 
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            viewMode === "grid" ? "bg-zinc-700 text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "p-1.5 rounded-md transition-all",
                            viewMode === "list" ? "bg-zinc-700 text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        <ListIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

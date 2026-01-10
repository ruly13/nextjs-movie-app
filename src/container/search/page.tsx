"use client";

import { Movie } from "@/services/tmdb";
import { useState } from "react";
import { SearchHeader } from "./components/SearchHeader";
import { SearchControls } from "./components/SearchControls";
import { SearchResultsGrid } from "./components/SearchResultsGrid";

interface SearchPageContainerProps {
  initialMovies: Movie[];
  query: string;
}

export function SearchPageContainer({ initialMovies, query }: SearchPageContainerProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState("All Results");

  return (
    <div className="min-h-screen bg-background pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-8">
        
        <SearchHeader query={query} count={initialMovies.length} />

        <SearchControls 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
        />

        <SearchResultsGrid movies={initialMovies} viewMode={viewMode} />

      </div>
    </div>
  );
}

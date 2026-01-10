
"use client";

import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { MovieHero } from "./components/MovieHero";
import { PopularMovies } from "./components/PopularMovies";
import { TopRatedMovies } from "./components/TopRatedMovies";
import { ExploreMovies } from "./components/ExploreMovies";
import { Genre, Movie } from "@/services/tmdb";

interface MoviesPageProps {
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    exploreMovies: Movie[];
    genres: Genre[];
}

export default function MoviesPage({ popularMovies, topRatedMovies, exploreMovies, genres }: MoviesPageProps) {
  return (
    
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <MovieHero />

      <div className="container mx-auto px-4 md:px-8 space-y-16">
        <PopularMovies movies={popularMovies} />
        <TopRatedMovies movies={topRatedMovies} />
        <ExploreMovies initialMovies={exploreMovies} genres={genres} />
      </div>
    </div>
  );
}

"use server";

import { getMoviesByGenre } from "@/services/tmdb";

export async function fetchMoviesByGenre(genreId: number | null, sortBy: string = "popularity.desc") {
  return await getMoviesByGenre(genreId ?? undefined, sortBy);
}

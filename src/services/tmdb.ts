const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export interface Movie {
  id: number;
  title?: string;
  name?: string; // TV shows use name
  release_date?: string;
  first_air_date?: string; // TV shows use first_air_date
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type?: string;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

interface TrendingResponse {
  results: Movie[];
}

interface GenreResponse {
  genres: Genre[];
}

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY is not set in .env.local");
    throw new Error("TMDB_API_KEY is not set");
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: "en-US",
    ...params,
  });

  const res = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.statusText}`);
  }

  return res.json();
}

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>(
      `/trending/all/${timeWindow}`
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export async function getPopularMovies(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>("/movie/popular");
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>("/movie/top_rated");
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
}

export async function getMoviesByGenre(
  genreId?: number,
  sortBy: string = "popularity.desc"
): Promise<Movie[]> {
  try {
    const params: Record<string, string> = {
      sort_by: sortBy,
      include_adult: "false",
      include_video: "false",
      page: "1",
    };

    if (genreId) {
      params.with_genres = genreId.toString();
    }

    const data = await fetchTMDB<TrendingResponse>("/discover/movie", params);
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await fetchTMDB<GenreResponse>("/genre/movie/list");
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<Movie[]> {
  try {
    if (!query) return [];

    // Check if query looks like a TMDB ID (all numbers) - optional, but useful if user pastes ID
    // Otherwise standard search

    const data = await fetchTMDB<TrendingResponse>("/search/movie", {
      query: query,
      include_adult: "false",
      page: page.toString(),
    });
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

// ... existing code ...

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

// ... existing fetchTMDB function ...

export async function getMovieDetail(id: string): Promise<MovieDetail | null> {
  try {
    const data = await fetchTMDB<MovieDetail>(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie detail for id ${id}:`, error);
    return null;
  }
}

export async function getMovieCredits(id: string): Promise<Credits | null> {
  try {
    const data = await fetchTMDB<Credits>(`/movie/${id}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching movie credits for id ${id}:`, error);
    return null;
  }
}

export async function getMovieRecommendations(id: string): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>(
      `/movie/${id}/recommendations`
    );
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie recommendations for id ${id}:`, error);
    return [];
  }
}

export function getImageUrl(
  path: string | null | undefined,
  size: "w500" | "original" = "w500"
) {
  if (!path) return "/placeholder-movie.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

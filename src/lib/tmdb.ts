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
}

interface TrendingResponse {
  results: Movie[];
}

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY is not set in .env.local");
    return [];
  }

  try {
    // Changed from /trending/movie to /trending/all to match official site behavior
    const res = await fetch(
      `${BASE_URL}/trending/all/${timeWindow}?language=en-US&api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch trending movies: ${res.statusText}`);
    }

    const data: TrendingResponse = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export function getImageUrl(path: string, size: "w500" | "original" = "w500") {
  if (!path) return "/placeholder-movie.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

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
  original_language?: string;
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

export async function getTrendingTVShows(
  timeWindow: "day" | "week" = "day"
): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>(
      `/trending/tv/${timeWindow}`
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    return [];
  }
}

export async function getPopularTVShows(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>("/tv/popular");
    return data.results;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
}

export async function getTopRatedTVShows(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>("/tv/top_rated");
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated TV shows:", error);
    return [];
  }
}

export async function getOnTheAirTVShows(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>("/tv/on_the_air");
    return data.results;
  } catch (error) {
    console.error("Error fetching on the air TV shows:", error);
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

export async function getTVGenres(): Promise<Genre[]> {
  try {
    const data = await fetchTMDB<GenreResponse>("/genre/tv/list");
    return data.genres;
  } catch (error) {
    console.error("Error fetching TV genres:", error);
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
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
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

export async function getTVShowDetail(id: string): Promise<MovieDetail | null> {
  try {
    const data = await fetchTMDB<MovieDetail>(`/tv/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV show detail for id ${id}:`, error);
    return null;
  }
}

// ... existing interfaces ...

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

interface SeasonDetail {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

interface VideoResponse {
  id: number;
  results: Video[];
}

// ... existing fetch functions ...

export async function getMovieVideos(id: string): Promise<Video[]> {
  try {
    const data = await fetchTMDB<VideoResponse>(`/movie/${id}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching movie videos for id ${id}:`, error);
    return [];
  }
}

export async function getTVShowVideos(id: string): Promise<Video[]> {
  try {
    const data = await fetchTMDB<VideoResponse>(`/tv/${id}/videos`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching TV show videos for id ${id}:`, error);
    return [];
  }
}

export async function getTVShowEpisodes(
  tvId: string,
  seasonNumber: number = 1
): Promise<Episode[]> {
  try {
    const data = await fetchTMDB<SeasonDetail>(
      `/tv/${tvId}/season/${seasonNumber}`
    );
    return data.episodes;
  } catch (error) {
    console.error(
      `Error fetching TV show episodes for id ${tvId} season ${seasonNumber}:`,
      error
    );
    return [];
  }
}

export async function getTVShowEpisodeVideos(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<Video[]> {
  try {
    const data = await fetchTMDB<VideoResponse>(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos`
    );
    return data.results;
  } catch (error) {
    console.error(
      `Error fetching videos for TV show ${tvId} S${seasonNumber}E${episodeNumber}:`,
      error
    );
    return [];
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

export async function getTVShowCredits(id: string): Promise<Credits | null> {
  try {
    const data = await fetchTMDB<Credits>(`/tv/${id}/credits`);
    return data;
  } catch (error) {
    console.error(`Error fetching TV show credits for id ${id}:`, error);
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

export async function getTVShowRecommendations(id: string): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<TrendingResponse>(`/tv/${id}/recommendations`);
    return data.results;
  } catch (error) {
    console.error(
      `Error fetching TV show recommendations for id ${id}:`,
      error
    );
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

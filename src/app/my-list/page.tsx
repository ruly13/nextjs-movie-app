import { getTopRatedMovies, getTopRatedTVShows, getGenres, getTVGenres } from "@/services/tmdb";
import MyListPageContainer from "@/container/my-list/page";

export const metadata = {
  title: "My Watchlist - MovieDB",
  description: "Manage your personalized list of movies and TV shows.",
};

export default async function MyListPage() {
  const [movies, tvShows, genres, tvGenres] = await Promise.all([
    getTopRatedMovies(),
    getTopRatedTVShows(),
    getGenres(),
    getTVGenres(),
  ]);

  return (
    <MyListPageContainer 
        initialMovies={movies}
        initialTVShows={tvShows}
        genres={genres}
        tvGenres={tvGenres}
    />
  );
}
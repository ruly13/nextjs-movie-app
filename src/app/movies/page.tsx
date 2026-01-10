import MoviesPage from "@/container/movies/page";
import { getGenres, getMoviesByGenre, getPopularMovies, getTopRatedMovies } from "@/services/tmdb";

export default async function Movies() {
    const popularMoviesData = getPopularMovies();
    const topRatedMoviesData = getTopRatedMovies();
    const exploreMoviesData = getMoviesByGenre(); // defaults to all
    const genresData = getGenres();

    const [popularMovies, topRatedMovies, exploreMovies, genres] = await Promise.all([
        popularMoviesData,
        topRatedMoviesData,
        exploreMoviesData,
        genresData
    ]);

    return (
        <MoviesPage 
            popularMovies={popularMovies} 
            topRatedMovies={topRatedMovies} 
            exploreMovies={exploreMovies}
            genres={genres}
        />
    );
}
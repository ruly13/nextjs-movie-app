import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { TVShowHero } from "./components/TVShowHero";
import { TVShowList } from "./components/TVShowList";
import { 
  getPopularTVShows, 
  getTrendingTVShows, 
  getTVGenres, 
  getTopRatedTVShows, 
  getOnTheAirTVShows,
  Movie
} from "@/services/tmdb";

interface TVShowsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TVShowsPage({ searchParams }: TVShowsPageProps) {
  const resolvedSearchParams = await searchParams;
  const sort = (resolvedSearchParams.sort as string) || "popularity";

  let showListPromise: Promise<Movie[]>;
  let listTitle = "Explore TV Shows";

  switch (sort) {
    case "top_rated":
      showListPromise = getTopRatedTVShows();
      listTitle = "Top Rated TV Shows";
      break;
    case "on_the_air":
      showListPromise = getOnTheAirTVShows();
      listTitle = "On The Air TV Shows";
      break;
    case "popularity":
    default:
      showListPromise = getPopularTVShows();
      listTitle = "Popular TV Shows";
      break;
  }

  const [shows, trendingShows, genres] = await Promise.all([
    showListPromise,
    getTrendingTVShows("day"),
    getTVGenres(),
  ]);

  const featuredShow = trendingShows[0];

  return (
    <main className="min-h-screen bg-[#121212]">
        <Navbar />
        <TVShowHero show={featuredShow} />
        <TVShowList 
            title={listTitle} 
            initialMovies={shows} 
            genres={genres}
            currentSort={sort}
        />
        <Footer />
    </main>
  );
}

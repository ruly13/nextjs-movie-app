import { SearchPageContainer } from "@/container/search/page";
import { Navbar } from "@/container/shared/Navbar";
import { Footer } from "@/container/shared/Footer";
import { searchMovies } from "@/services/tmdb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results - MovieDB",
  description: "Search results for movies and TV shows.",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams; // Await the promise
  const query = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const movies = await searchMovies(query);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SearchPageContainer initialMovies={movies} query={query} />
      <Footer />
    </div>
  );
}

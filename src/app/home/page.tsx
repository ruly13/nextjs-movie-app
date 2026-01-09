import { Navbar } from "@/container/shared/Navbar";
import { HomePage } from "@/container/home/HomePage";
import { Footer } from "@/container/shared/Footer";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const trendingTimeWindow = (resolvedSearchParams.trending as "day" | "week") || "day";

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      <HomePage timeWindow={trendingTimeWindow} />
      <Footer />
    </main>
  );
}
;
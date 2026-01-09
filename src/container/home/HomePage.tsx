import { Hero } from "./components/Hero";
import { Trending } from "./components/Trending";

interface HomePageProps {
  timeWindow?: "day" | "week";
}

export function HomePage({ timeWindow = "day" }: HomePageProps) {
  return (
    <div className="flex-1">
      <Hero />
      <Trending timeWindow={timeWindow} />
    </div>
  );
}

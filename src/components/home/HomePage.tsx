import { Hero } from "@/container/home/components/Hero";
import { Trending } from "@/container/home/components/Trending";

export function HomePage() {
  return (
    <div className="flex-1">
      <Hero />
      <Trending />
    </div>
  );
}

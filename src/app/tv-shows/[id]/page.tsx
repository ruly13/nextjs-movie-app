import TVShowDetailContainer from "@/container/tv-shows/detail/page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TVShowPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <TVShowDetailContainer id={resolvedParams.id} />;
}

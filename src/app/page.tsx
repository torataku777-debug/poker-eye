import { getSeriesMaster } from '@/lib/google-sheets';
import SeriesList from '@/components/SeriesList';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const series = await getSeriesMaster();

  return (
    <div>
      <SeriesList series={series} />
    </div>
  );
}

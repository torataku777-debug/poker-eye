import { getTournamentDetails, getExchangeRates } from '@/lib/google-sheets';
import EventList from '@/components/EventList';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SeriesPage({ params }: PageProps) {
    const { id } = await params;
    const [allEvents, rates] = await Promise.all([
        getTournamentDetails(),
        getExchangeRates(),
    ]);

    const filteredEvents = allEvents.filter(e => e.series_id === id);

    return (
        <div>
            <EventList events={filteredEvents} rates={rates} seriesId={id} />
        </div>
    );
}

import { getTournamentDetails, getExchangeRates } from '@/lib/google-sheets';
import EventDetail from '@/components/EventDetail';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: PageProps) {
    const { id } = await params;
    const [allEvents, rates] = await Promise.all([
        getTournamentDetails(),
        getExchangeRates(),
    ]);

    const event = allEvents.find(e => e.event_id === id);

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            <EventDetail event={event} rates={rates} />
        </div>
    );
}

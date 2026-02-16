"use client";

import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { Tournament, ExchangeRate } from '@/lib/google-sheets';
import styles from './EventList.module.css';

interface EventListProps {
    events: Tournament[];
    rates: ExchangeRate[];
    seriesId: string;
}

export default function EventList({ events, rates, seriesId }: EventListProps) {
    const { mode } = useCurrency();

    // Helper to find rate
    const getRate = (code: string) => {
        const rate = rates.find(r => r.currency_code === code);
        return rate ? rate.rate_to_jpy : 1; // Default to 1 if not found or JPY
    };

    const formatPrice = (amount: number, currency: string) => {
        if (mode === 'JPY') {
            if (currency === 'JPY') {
                return `¥${amount.toLocaleString()}`;
            }
            const rate = getRate(currency);
            const jpyAmount = Math.round(amount * rate);
            return `¥${jpyAmount.toLocaleString()}`;
        } else {
            // Local Mode
            return `${amount.toLocaleString()} ${currency}`;
        }
    };

    // Group by Date
    const groupedEvents: Record<string, Tournament[]> = {};
    events.forEach(event => {
        if (!event.start_time) return;
        const date = event.start_time.split('T')[0]; // Simple ISO date split
        if (!groupedEvents[date]) groupedEvents[date] = [];
        groupedEvents[date].push(event);
    });

    const sortedDates = Object.keys(groupedEvents).sort();

    const getDeepnessColor = (score: number) => {
        if (score >= 95) return 'linear-gradient(135deg, #00C6FF, #0072FF)'; // Diamond Blue
        if (score >= 88) return 'linear-gradient(135deg, #FFD700, #FFA500)'; // Gold
        return 'linear-gradient(135deg, #8899A6, #556677)'; // Grey
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={styles.backButton}>‹ シリーズ一覧へ</Link>
                <h2 className={styles.title}>{seriesId.replace(/_/g, ' ')} Schedule</h2>
            </header>

            <div className={styles.list}>
                {sortedDates.map(date => (
                    <div key={date} className={styles.dayGroup}>
                        <h3 className={styles.dateHeader}>
                            {new Date(date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
                        </h3>
                        {groupedEvents[date].map(event => (
                            <Link href={`/event/${event.event_id}`} key={event.event_id} className={styles.card}>
                                <div className={styles.cardMain}>
                                    <div className={styles.timeAndBadge}>
                                        <span className={styles.time}>
                                            {new Date(event.start_time).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <div
                                            className={styles.deepnessBadge}
                                            style={{ background: getDeepnessColor(event.deepness_score) }}
                                        >
                                            💎 {event.deepness_score}
                                        </div>
                                    </div>
                                    <h4 className={styles.eventName}>{event.event_name}</h4>
                                </div>
                                <div className={styles.priceColumn}>
                                    <span className={`${styles.price} number`}>
                                        {formatPrice(event.buyin_local, event.currency)}
                                    </span>
                                    <span className={styles.rake}>Rake: {event.rake_percent}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
                {sortedDates.length === 0 && (
                    <p className={styles.empty}>No tournaments found for this series.</p>
                )}
            </div>
        </div>
    );
}

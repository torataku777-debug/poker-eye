"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { Tournament, ExchangeRate } from '@/lib/google-sheets';
import { ChevronDown, ChevronUp, CheckCircle, Clock, MapPin } from 'lucide-react';
import styles from './EventDetail.module.css';

interface EventDetailProps {
    event: Tournament;
    rates: ExchangeRate | undefined; // Single rate or list? Usually passed list and found inside.
}

export default function EventDetail({ event, rates }: { event: Tournament, rates: ExchangeRate[] }) {
    const { mode } = useCurrency();
    const [isStructureOpen, setIsStructureOpen] = useState(false);

    // Helper to find rate
    const getRate = (code: string) => {
        const rate = rates.find(r => r.currency_code === code);
        return rate ? rate.rate_to_jpy : 1;
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
            return `${amount.toLocaleString()} ${currency}`;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href={`/series/${event.series_id}`} className={styles.backButton}>‹ スケジュールへ戻る</Link>
            </header>

            <h1 className={styles.title}>{event.event_name}</h1>

            <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                    <Clock size={16} />
                    <span>{new Date(event.start_time).toLocaleString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={styles.metaItem}>
                    <MapPin size={16} />
                    <span>{event.series_id} Venue</span>
                </div>
            </div>

            <div className={styles.mainCard}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Buy-in</span>
                    <span className={`${styles.value} number`}>{formatPrice(event.buyin_local, event.currency)}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Rake</span>
                    <span className={styles.value}>{event.rake_percent}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Tax (源泉徴収)</span>
                    <span className={styles.value}>{event.tax_info || 'None'}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>ITIN Support</span>
                    <div className={styles.value}>
                        <CheckCircle size={16} color="#00FF88" />
                        <span>Available</span>
                    </div>
                </div>
            </div>

            <div className={styles.accordion}>
                <button
                    className={styles.accordionHeader}
                    onClick={() => setIsStructureOpen(!isStructureOpen)}
                >
                    <span className={styles.accordionTitle}>Blind Structure</span>
                    {isStructureOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                {isStructureOpen && (
                    <div className={styles.accordionContent}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Lvl</th>
                                    <th>SB</th>
                                    <th>BB</th>
                                    <th>Ante</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>100</td><td>200</td><td>200</td></tr>
                                <tr><td>2</td><td>200</td><td>400</td><td>400</td></tr>
                                <tr><td>3</td><td>300</td><td>600</td><td>600</td></tr>
                                <tr><td>4</td><td>400</td><td>800</td><td>800</td></tr>
                                <tr><td>5</td><td>500</td><td>1,000</td><td>1,000</td></tr>
                            </tbody>
                        </table>
                        <p className={styles.note}>* Sample Structure Data</p>
                    </div>
                )}
            </div>

            <button className={styles.registerButton}>
                Waitlist Registration (Coming Soon)
            </button>
        </div>
    );
}

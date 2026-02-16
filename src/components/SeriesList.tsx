"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Series } from '@/lib/google-sheets';
import styles from './SeriesList.module.css';

const countryToFlag: Record<string, string> = {
    'Taiwan': '🇹🇼',
    'USA': '🇺🇸',
    'Czech Republic': '🇨🇿',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'Philippines': '🇵🇭'
};

export default function SeriesList({ series }: { series: Series[] }) {
    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumSignificantDigits: 3 }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>大会シリーズ選択</h2>
                <div className={styles.filters}>
                    <button className={`${styles.filterButton} ${styles.active}`}>すべて</button>
                    <button className={styles.filterButton}>🇯🇵 日本国内</button>
                    <button className={styles.filterButton}>🇺🇸 ラスベガス</button>
                </div>
            </div>

            <div className={styles.list}>
                {series.map((item) => (
                    <Link href={`/series/${item.series_id}`} key={item.series_id} className={styles.card}>
                        <div className={styles.logoContainer}>
                            {/* Fallback for logo if URL is dummy. In production, use real images or a placeholder component */}
                            <div className={styles.logoPlaceholder}>{item.brand_name}</div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.mainRow}>
                                <h3 className={styles.seriesName}>{(item.series_id || '').replace(/_/g, ' ')}</h3>
                                <span className={styles.arrow}>›</span>
                            </div>
                            <p className={styles.dates}>
                                {formatDate(item.start_date)} - {formatDate(item.end_date)}
                            </p>
                            <div className={styles.metaRow}>
                                <span className={styles.country}>
                                    {countryToFlag[item.country] || '🏳️'} {item.city}
                                </span>
                                <div className={styles.prize}>
                                    <span className={styles.prizeLabel}>保証プライズ</span>
                                    <span className={`${styles.prizeAmount} number`}>{formatMoney(item.total_prize_jpy)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

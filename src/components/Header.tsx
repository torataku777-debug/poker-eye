"use client";

import { useCurrency } from '@/context/CurrencyContext';
import styles from './Header.module.css';

export default function Header() {
    const { mode, toggleMode } = useCurrency();

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>POKER EYE</h1>
            <button onClick={toggleMode} className={styles.currencyToggle}>
                <span className={`${styles.currencyOption} ${mode === 'JPY' ? styles.active : ''}`}>円</span>
                <span className={styles.divider}>/</span>
                <span className={`${styles.currencyOption} ${mode === 'LOCAL' ? styles.active : ''}`}>外貨</span>
            </button>
        </header>
    );
}

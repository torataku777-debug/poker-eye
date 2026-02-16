"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bookmark, User } from 'lucide-react';
import styles from './BottomNavigation.module.css';

export default function BottomNavigation() {
    const pathname = usePathname();

    const navItems = [
        { label: '大会検索', href: '/', icon: Search },
        { label: '保存済み', href: '/saved', icon: Bookmark },
        { label: 'マイページ', href: '/mypage', icon: User },
    ];

    return (
        <nav className={styles.nav}>
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link key={item.href} href={item.href} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

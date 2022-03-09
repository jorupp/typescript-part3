import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
    return <ul className={styles.header}>
        <li><Link href="/json">JSON</Link></li>
        <li><Link href="/infer">Infer</Link></li>
        <li><Link href="/escape">Escape</Link></li>
    </ul>
}

export default Header;
import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
    return <ul className={styles.header}>
        <li><Link href="/json">JSON</Link></li>
        <li><Link href="/json">second</Link></li>
        <li><Link href="/json">third</Link></li>
    </ul>
}

export default Header;
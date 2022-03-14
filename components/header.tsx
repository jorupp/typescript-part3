import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <ul className={styles.header}>
      <li>
        <b>Pages</b>
      </li>
      <li>
        <Link href="/json">JSON</Link>
      </li>
      <li>
        <Link href="/escape">Escape</Link>
      </li>
      <li>
        <Link href="/ref">Ref</Link>
      </li>
    </ul>
  );
};

export default Header;

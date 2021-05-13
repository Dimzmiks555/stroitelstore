import styles from './Footer.module.css';
import Link from 'next/link'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <Link href="/">
                    <a><img src="/LOGO.svg" /></a>
                </Link>
            </div>
        </div>
    )
}

export default Footer
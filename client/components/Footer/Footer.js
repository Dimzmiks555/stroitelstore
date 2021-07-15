import styles from './Footer.module.css';
import Link from 'next/link'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <Link href="/">
                    <a><img src="/LOGO_WHITE.svg" /></a>
                </Link>
            </div>
            <div className={styles.menu}>
                <ul>
                    <li>
                        О магазине
                    </li>
                    <li>
                        Доставка и оплата
                    </li>
                    <li>
                        Сотрудничество
                    </li>
                    <li>
                        Контакты
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
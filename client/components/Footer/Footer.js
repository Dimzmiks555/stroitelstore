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
            <div className={styles.contact_info}>
                <div>
                    <h2>
                        +7 (900) 300-13-12
                    </h2>
                    <h3>г. Лиски, ул. Коммунистическая, д. 25</h3>
                    <h3>
                    stroitel.office@gmail.com

                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Footer
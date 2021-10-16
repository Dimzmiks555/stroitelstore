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
                    <Link href="/about">
                        <li>
                            <a>О магазине</a>
                        </li>
                    </Link>
                    <Link href="/payment_and_delivery">
                    <li>
                        <a>Доставка и оплата</a>
                    </li>
                    </Link>
                    {/* <li>
                        Сотрудничество
                    </li> */}
                    <Link href='/contacts'>
                    <li>
                        <a>Контакты</a>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className={styles.contact_info}>
                <div>
                    <h2>
                        +7 (919) 242-13-12
                    </h2>
                    <h3>г. Лиски, ул. Коммунистическая, д. 25</h3>
                    <h3>
                    stroitel.office@gmail.com

                    </h3>
                    <img src='/footer/sber.svg'></img>
                    <img src='/footer/visa.png'></img>
                </div>
            </div>
        </div>
    )
}

export default Footer
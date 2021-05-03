import styles from './Header.module.css';
import CatalogStore from "./CatalogStore";
import {observer} from "mobx-react";
import Link from 'next/link';
const Header = observer(() => {
    function handleClick() {
        CatalogStore.AppendCatalog()
    }
    return (
        <>
        <div className={styles.underheader}>
            <a href="https://yandex.ru/maps/10678/lisky/house/kommunisticheskaya_ulitsa_25/Z0AYcwdjS0wPQFtqfXV5dX5jZg==/?ll=39.503298%2C50.984202&utm_source=main_stripe_big&z=16.56"><img src="/header/map.svg"></img>Воронежская обл., г. Лиски, ул. Коммунистическая, д. 25</a>
            <div>anodaday@yandex.ru</div>
            <div>+7 ( 900 ) 300 - 13 - 12</div>
        </div>
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <a><img src="/LOGO.svg" /></a>
                </Link>
            </div>
            <button className={styles.catalog__button} onClick={handleClick}>
                <img src="/header/catalog.svg" /> Каталог
            </button>
            <input className={styles.search} placeholder="Поиск...">
            </input>
            <div className={styles.userblock}>
                <div className={styles.user}>
                    <img src="/header/user.svg" />
                </div>
                <a href="#" className={styles.cart}>
                    <img src="/header/shopping-cart.svg" />
                </a>
            </div>
        </div>
        </>
    )
})

export default Header
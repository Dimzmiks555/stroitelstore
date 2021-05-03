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
            <div>Воронежская обл., г. Лиски, ул. Коммунистическая, д. 25</div>
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
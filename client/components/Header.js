import styles from './Header.module.css';
import CatalogStore from "./CatalogStore";
import {observer} from "mobx-react";
import Link from 'next/link';
const Header = observer(() => {
    function handleClick() {
        CatalogStore.AppendCatalog()
    }
    return (
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
        </div>
    )
})

export default Header
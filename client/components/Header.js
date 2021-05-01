import styles from './Header.module.css';
import CatalogStore from "./CatalogStore";
import {observer} from "mobx-react";
const Header = observer(() => {
    function handleClick() {
        CatalogStore.AppendCatalog()
    }
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="/LOGO.svg" />
            </div>
            <button className={styles.catalog__button} onClick={handleClick}>
                <img src="/header/catalog.svg" /> Каталог
            </button>
            <input className={styles.search} placeholder="Поиск">
            </input>
        </div>
    )
})

export default Header
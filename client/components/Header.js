import styles from './Header.module.css';
import CatalogStore from "./CatalogStore";
import {observer} from "mobx-react";
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
const Header = observer(() => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src="/LOGO.svg" />
            </div>
            {console.log(CatalogStore.display)}
            <button className={styles.catalog__button} onClick={CatalogStore.AppendCatalog}>
                <img src="/header/catalog.svg" /> Каталог
            </button>
            <input className={styles.search} placeholder="Поиск">
            </input>
        </div>
    )
})

export default Header
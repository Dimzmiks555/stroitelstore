import CatalogStore from "./CatalogStore";
import styles from './Catalog.module.css';
import {observer} from "mobx-react";
import { enableStaticRendering } from "mobx-react";
import CatalogItems from './Catalog/CatalogItems'
import CatalogNavItem from './Catalog/CatalogNavItem'
import Link from 'next/link'
import stylesHeader from './Header/Header.module.css'
import Search from "./Search/Search";

enableStaticRendering(typeof window === "undefined");
const Catalog = observer(() => {
    function handleClick() {
        CatalogStore.HideCatalog()
    };
    
    if (CatalogStore.props.display == 'none'){
        return null
    } else {
        return (
            <>
                
                <div className={styles.catalog}>
                    <div className={stylesHeader.header}>
                        <div className={stylesHeader.logo}>
                            <Link href="/">
                                <a><img src="/LOGO.svg" /></a>
                            </Link>
                        </div>
                        <Search />
                        <div className={stylesHeader.userblock}>
                            <button className={styles.close} onClick={handleClick}>&#215;</button>
                        </div>
                    </div>
                    <div className={styles.catalog_block}>
                        <h1>Каталог</h1>
                        <div className={styles.catalog__table}>
                            <div className={styles.catalog__nav}>
                                {CatalogStore.props.categories.map(category => (
                                    <CatalogNavItem category={category}/>
                                ))}
                            </div>
                            <CatalogItems />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
})

export default Catalog
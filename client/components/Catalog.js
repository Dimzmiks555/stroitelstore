import CatalogStore from "./CatalogStore";
import {CSSTransition} from 'react-transition-group'
import styles from './Catalog.module.css';
import {observer} from "mobx-react";
import { enableStaticRendering } from "mobx-react";
import CatalogItems from './Catalog/CatalogItems'
import CatalogItemsStore from "./Catalog/CatalogItemsStore";
import CatalogNavItem from './Catalog/CatalogNavItem'
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
                    <button className={styles.close} onClick={handleClick}>&#215;</button>
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
            </>
        )
    }
    
})

export default Catalog
import { observer } from "mobx-react";
import styles from '../Catalog.module.css'
import CatalogItemsStore from './CatalogItemsStore'
const CatalogNavItem = observer(({category}) => {

    
    function SetCategory(e) {
        CatalogItemsStore.SetCategory(category)
    }

    return (
        <div className={styles.catalog__nav_item} onMouseEnter={SetCategory}>
            <img src={category.url}></img>
            <h4>{category.category}</h4>
        </div>
    )
})

export default CatalogNavItem
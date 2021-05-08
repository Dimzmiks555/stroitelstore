import { observer } from "mobx-react";
import styles from '../Catalog.module.css'
import CatalogItemsStore from "./CatalogItemsStore";
import Link from 'next/link'
import CatalogStore from "../CatalogStore";
const CatalogItems = observer(() => {

    function handleClick() {
        CatalogStore.HideCatalog()
    }

    return (
        <div className={styles.catalog__items}>
            <div className={styles.catalog__itemsblock}>
                <h1>{CatalogItemsStore.props.category}</h1>
                <div>
                    {CatalogItemsStore.props.subcats.map((subcat) => (
                        <Link href={`/catalog/${subcat.route}`}>
                            <a className={styles.catalog__link} onClick={handleClick}>{subcat.name}</a>
                        </Link>
                    ))}
                </div>
            </div>
            {console.log(CatalogItemsStore.props.board)}
            <div className={styles.catalog_img}>
                <img src={CatalogItemsStore.props.board}>
                </img>
            </div>
        </div>
        
    )
})

export default CatalogItems
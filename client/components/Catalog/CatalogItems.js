import { observer } from "mobx-react";
import styles from '../Catalog.module.css'
import CatalogItemsStore from "./CatalogItemsStore";
import Link from 'next/link'
import CatalogStore from "../CatalogStore";
import CategoryStore from "./category/categoryStore";
const CatalogItems = observer(() => {

    function handleClick( e) {
        CatalogStore.HideCatalog();
    }

    return (
        <div className={styles.catalog__items}>
            <div className={styles.catalog__itemsblock}>
                <h1>{CatalogItemsStore.props.category}</h1>
                <div className={styles.catalog__itemslist}>
                    {CatalogItemsStore.props.subcats.map((subcat) => (
                        <Link href={`/catalog/${subcat.id}`}>
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
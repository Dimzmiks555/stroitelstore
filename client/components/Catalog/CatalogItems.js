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
            <h1>{CatalogItemsStore.props.category}</h1>
            <div>
                {CatalogItemsStore.props.subcats.map((subcat, index) => (
                    <Link href={`/catalog/${index}/${subcat.route}`}>
                        <a className={styles.catalog__link} onClick={handleClick}>{subcat.name}</a>
                    </Link>
                ))}
            </div>
        </div>
    )
})

export default CatalogItems
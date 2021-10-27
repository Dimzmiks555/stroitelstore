import { observer } from "mobx-react";
import styles from '../Catalog.module.css'
import CatalogItemsStore from "./CatalogItemsStore";
import Link from 'next/link'
import CatalogStore from "../CatalogStore";
import CategoryStore from "./category/categoryStore";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
const CatalogItems = observer(() => {

    function handleClick( e) {
        CatalogStore.HideCatalog();
    }


    return (
        <div className={styles.catalog__items}>
        {CatalogItemsStore.promise == 'done' ? (
            <>
            <div className={styles.catalog__itemsblock}>
                <h1>{CatalogItemsStore.props.category}</h1>
                    <div className={styles.catalog__itemslist}>
                    {CatalogItemsStore.props?.data?.map((subcat) => (
                        
                        <Link href={`/catalog/${subcat.guid}/1`}>
                            <a className={styles.catalog__link} onClick={handleClick}>{subcat.title}</a>
                        </Link>
                    ))} 
                    </div>
            </div>
            <div className={styles.catalog_img}>
                <img src={CatalogItemsStore.props.board}>
                </img>
            </div>
            </>
                ) : <Loader></Loader>}
        </div>
        
    )
})

export default CatalogItems
import { observer } from "mobx-react";
import styles from '../Catalog.module.css'
import CatalogItemsStore from './CatalogItemsStore'

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
const CatalogNavItem = observer(({category}) => {

    
    function SetCategory(e) {
        CatalogItemsStore.SetCategory(category)
    }

    async function getData(parent){

        const api = new WooCommerceRestApi({
            url: "http://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3"
            });

            await api.get("products/categories", {
                per_page: 20,
                display: "subcategories",
                id: 66

            })
            .then( result => {
                        console.log(result.data)
                    }
                )
            
            
    }

    getData(category?.id)

    return (
        <div className={styles.catalog__nav_item} onMouseEnter={SetCategory}>
            <img src={category.url}></img>
            <h4>{category.category}</h4>
        </div>
    )
})

export default CatalogNavItem
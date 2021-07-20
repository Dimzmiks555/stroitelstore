import { makeAutoObservable } from "mobx"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useState } from "react";
class CatalogItemsStore {

    props = []
    promise = 'pending'

    constructor() {
        makeAutoObservable(this);
    }
    SetCategory(category) {
        this.props = category;
        console.log(this.promise)
    }
    setPending(value) {
        this.promise = value 
    }
    async getData(parent, board){
        if (!isNaN(parent)) {
            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3",
                queryStringAuth: true,
                axiosConfig: {
                    headers: {'Content-Type': 'application/json'},
                    }
                });
    
                await api.get("products/categories", {
                    per_page: 30,
                    parent: parent
    
                })
                .then( result => {
                        this.props = ({data: result.data, board: board})
                        this.setPending('done')
                        }
                    )
        } else {
            this.props = ({data: [], board: board})
        }
            
            
    }
}

export default new CatalogItemsStore()


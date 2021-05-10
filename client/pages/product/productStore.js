import { action, makeAutoObservable, observable } from "mobx"
import { enableStaticRendering } from "mobx-react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");

class ProductStore {
    data = []

    constructor() {
        makeAutoObservable(this);
    }

    async getData(id){
        this.data = []
        const api = new WooCommerceRestApi({
            url: "http://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3"
            });
        await api.get(`products/${id}`)
            .then(
                action('fetchSuccess', result => {
                    this.data = result.data
                })
            )
        
    }
    
    clearData(){
        this.data = [];
    }
}

export default new ProductStore()


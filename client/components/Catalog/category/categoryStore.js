import { action, makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");

class CategoryStore {

    data = []


    constructor() {
        makeAutoObservable(this);
    }
    
    clearData(){
        this.data = [];
        this.id = null
    }
}

export default new CategoryStore()


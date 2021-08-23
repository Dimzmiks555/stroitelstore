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
    
        } else {
            this.props = ({data: [], board: board})
        }
            
            
    }
}

export default new CatalogItemsStore()


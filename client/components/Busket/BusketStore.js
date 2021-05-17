import { makeObservable, computed, observable, action} from "mobx"
import { enableStaticRendering } from "mobx-react";

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");
class BusketStore {

    constructor() {
        makeObservable(this, {
            positions: observable,
            AddPosition: action,
            getData: action,
            incrementCount: action,
            decrementCount: action,
            setCount: action,
            delete: action
        });
    }

    positions = []

    async getData(id, count){
        const api = new WooCommerceRestApi({
            url: "http://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3"
            });
        await api.get(`products/${id}`)
            .then( result => {
                    this.positions.push({
                        count: +count,
                        data: result.data
                    })                    
                }
            )
        
    }
    setCount(index, value) {
        
        if (value > 0 || value == '' && value != 'e') {
            
            this.positions[index].count = value
        }
    }
    incrementCount(index) {
        if (index != undefined) {
            
            this.positions[index].count = +this.positions[index].count + 1
        }
    }
    decrementCount(index) {
        if (index != undefined) {
            
            this.positions[index].count = +this.positions[index].count - 1
        }
    }
    AddPosition(id, count) {
        let filter = this.positions.findIndex(item => item.data.id == id)
        if (filter == -1) {
            this.getData(id, count)
        } else {
            this.positions[filter].count = +count
        }
    }
    delete(index) {
        this.positions = this.positions.splice(+index - 1, 1)
    }

}

export default new BusketStore()


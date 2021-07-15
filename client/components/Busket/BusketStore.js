import { makeObservable, computed, observable, action} from "mobx"
import { enableStaticRendering } from "mobx-react";
import styles from './Busket.module.css'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");
class BusketStore {

    constructor() {
        makeObservable(this, {
            positions: observable,
            order: observable,
            delivery: observable,
            initFetchStatus: observable,
            AddPosition: action,
            getData: action,
            incrementCount: action,
            decrementCount: action,
            setCount: action,
            delete: action,
            setDelivery: action,
            getInitData: action
        });
    }
    initFetchStatus = 'pending';
    positions = []
    order = {
        products: [

        ]
    }
    delivery = ''

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
                        id: result.data.id
                    });
                    this.order.products.push({
                        count: +count,
                        data: result.data
                    });
                    
                    localStorage.setItem('positions', JSON.stringify(this.positions))                
                }
            )
        
    }
    async getInitData(positions){
        
        let ids = []
        positions.forEach(item => {
            ids.push(item.id)
        });
        const api = new WooCommerceRestApi({
            url: "http://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3"
            });
        await api.get(`products`, {
            include: ids
        })
            .then( result => {
                    result.data.forEach((item, index) => {
                        this.order.products.push(
                           {data: result.data[index]}
                        );  
                    })   
                    this.initFetchStatus = 'done'   
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
        let filter = this.positions.findIndex(item => item.id == id)
        if (filter == -1) {
            this.getData(id, count)    
        } else {
            this.positions[filter].count = +count
            this.order.products[filter].count = +count
            localStorage.setItem('positions', JSON.stringify(this.positions))
        }
        
    }
    delete(index, id) {
        this.positions = this.positions.filter((it) => {return it.id != id});
        this.order.products = this.order.products.filter((it) => {return it.data.id != id});
        localStorage.setItem('positions', JSON.stringify(this.positions))  
    }

    initialSet(positions) {
        this.positions = positions
        this.getInitData(positions)
    }
    setDelivery(value) {
        this.delivery = value;
    }



}

export default new BusketStore()


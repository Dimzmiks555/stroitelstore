import { makeAutoObservable } from "mobx";

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import HeaderStore from "../Header/HeaderStore";



class CabinetStore {

orders = []


constructor() {
    makeAutoObservable(this)
}

async getOrders() {
    const api = new WooCommerceRestApi({
        url: "https://admin.stroitelstore.ru/",
        consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
        consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
        version: "wc/v3",
        queryStringAuth: true,
        axiosConfig: {
          headers: {'Content-Type': 'application/json'},
          }
        });
    await api.get("orders", {
            per_page: 20,
            customer: HeaderStore.userData[0]?.id
        })
        .then( result => {
                this.orders = result.data
            }
        )
}




}

export default new CabinetStore;
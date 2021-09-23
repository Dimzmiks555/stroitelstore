import { makeAutoObservable } from "mobx";

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import HeaderStore from "../Header/HeaderStore";



class CabinetStore {

orders = []


constructor() {
    makeAutoObservable(this)
}

async getOrders() {
    
}




}

export default new CabinetStore;
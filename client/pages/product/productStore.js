import { action, makeAutoObservable, observable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");

class ProductStore {
    data = []
    isLoading = true

    constructor() {
        makeAutoObservable(this);
    }

    
    clearData(){
        this.data = [];
    }
}

export default new ProductStore()


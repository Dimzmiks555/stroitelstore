import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CatalogStore {

    catalog = {
        display: 'none'
    }

    constructor() {
        makeAutoObservable(this);
    }
    AppendCatalog() {
        this.catalog.display = 'block';
    }
}

export default new CatalogStore


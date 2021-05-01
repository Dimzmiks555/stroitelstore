import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CatalogStore {

    props = {
        display: 'none'
    }

    constructor() {
        makeAutoObservable(this);
    }
    AppendCatalog() {
        this.props.display = 'block';
    }
    HideCatalog() {
        this.props.display = 'none';
    }
}

export default new CatalogStore()


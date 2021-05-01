import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CatalogItemsStore {

    props = {
        category: 'Крепеж',
        url: '/catalog/screw.svg',
        subcats: [
            {
                name: 'Болты',
                route: 'bolts'
            },
            {
                name: 'Саморезы',
                route: 'screws'
            },
            {
                name: 'Шайбы',
                route: 'shims'
            },
        ]
        }

    constructor() {
        makeAutoObservable(this);
    }
    SetCategory(category) {
        this.props = category;
    }
}

export default new CatalogItemsStore()


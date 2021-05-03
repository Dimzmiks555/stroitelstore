import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CategoryStore {

    cats = {
        screws: {
            title: 'Саморезы'
        },
        bolts: {
            title: 'Болты'
        },
        shims: {
            title: 'Шайбы'
        },
        drills: {
            title: 'Дрели'
        },
        hammers: {
            title: 'Молотки'
        },
        paints115: {
            title: 'Краски ПФ-115'
        },
        drills: {
            title: 'Дрели'
        },
        drills: {
            title: 'Дрели'
        },
        drills: {
            title: 'Дрели'
        },
        drills: {
            title: 'Дрели'
        },
        drills: {
            title: 'Дрели'
        },
        drills: {
            title: 'Дрели'
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new CategoryStore()


import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CategoryStore {
    data = []
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
        arcs: {
            title: 'Арки',
            category_id: 27
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
    getData(data) {
        this.data = data;
    }
}

export default new CategoryStore()


import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class BusketStore {

    positions = [
        {
            id: null,
            count: null
        }
    ]

    counts = [
        {
            count: null
        }
    ]

    constructor() {
        makeAutoObservable(this);
    }

    AddPosition(id, count) {
        this.positions.push({id: id.toString(), count: count})
    }
    AddCount(count) {
        this.counts.push({count: count})
    }

}

export default new BusketStore()


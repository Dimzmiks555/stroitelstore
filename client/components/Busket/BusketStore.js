import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class BusketStore {

    positions = [
        {
            id: undefined
        }
    ]

    constructor() {
        makeAutoObservable(this);
    }

    AddPosition(id) {
        this.positions.push({id: id.toString()})
    }

}

export default new BusketStore()


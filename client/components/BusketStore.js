import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class BusketStore {

    constructor() {
        makeAutoObservable(this);
    }

}

export default new BusketStore()


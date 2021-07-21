import { makeAutoObservable } from "mobx";


class HeaderStore {

    userData = {}



    constructor() {
        makeAutoObservable(this);
    }


    setUserData(data) {
        this.userData = data
        console.log(data)
    }


}

export default new HeaderStore;
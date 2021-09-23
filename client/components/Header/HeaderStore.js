import { makeAutoObservable } from "mobx";


class HeaderStore {

    is_Auth = false
    userData = {}



    constructor() {
        makeAutoObservable(this);
    }


    setUserData(data) {
        this.userData = data
        console.log(data)
    }

    setAuth(value) {
        this.is_Auth = value
    }


}

export default new HeaderStore;
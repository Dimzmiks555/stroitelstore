import { makeAutoObservable } from "mobx";


class ModalStore {

    isOpen = false
    good = {}


    constructor() {
        makeAutoObservable(this)
    }


    setIsOpen(state) {
        this.isOpen = state
    }

    setGood(obj) {
        this.good = obj
    }


}

export default new ModalStore()
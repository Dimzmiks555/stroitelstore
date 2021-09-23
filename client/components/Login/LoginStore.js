import { makeAutoObservable } from "mobx";


class LoginStore {

    registrationData = {
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
    }



    constructor() {
        makeAutoObservable(this)
    }

    setData(id, value) {
        if (id == 'password') {
            this.registrationData.password = value;
        } else if (id == 'email') {
            this.registrationData.email = value;
        } else if (id == 'first_name') {
            this.registrationData.name = value;
        } else if (id == 'last_name') {
            this.registrationData.surname = value;
        } else if (id == 'phone') {
            this.registrationData.phone = value;
        }
    }


}


export default new LoginStore
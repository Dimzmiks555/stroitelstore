import { makeAutoObservable, computed, observable, action} from "mobx"
import { enableStaticRendering } from "mobx-react";
import { useRouter } from "next/router";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import HeaderStore from "../Header/HeaderStore";
enableStaticRendering(typeof window === "undefined");

class BusketStore {

    constructor() {
        makeAutoObservable(this);
    }
    initFetchStatus = 'pending';
    positions = []
    order = {
        delivery: '',
        payment: '',
        clientData: {
            name: '',
            surname: '',
            phone: '',
            mail: '',
            customer_id: 0
        },
        address : {
            city: '',
            street: '',
            house: '',
            room: ''
        },
        products: []
    }

    newDelivery = {
        city: '',
        street: '',
        house: '',
        room: ''
    }


    // async getData(id, count){
  
        
    // }

    // async getInitData(positions){
        
    //     let ids = []
    //     let counts = []
    //     positions.forEach(item => {
    //         ids.push(item.guid);
    //         counts.push(item.count)
    //     });
        
    // }
    setCount(id, value) {
        
        if (value > 0 || value != '' && value != 'e' && value != 0) {
            let filter = this.positions.findIndex(item => item.guid == id)
            this.positions[filter].count = +value
            this.order.products[filter].count = +value
            localStorage.setItem('positions', JSON.stringify(this.positions))
        } else {
            let filter = this.positions.findIndex(item => item.guid == id)
            this.positions[filter].count = 1
            this.order.products[filter].count = 1
            localStorage.setItem('positions', JSON.stringify(this.positions))
        }
    }
    incrementCount(id) {
        if (id != undefined) {
            let filter = this.positions.findIndex(item => item.guid == id)
            this.positions[filter].count = +this.positions[filter].count + 1
            this.order.products[filter].count = +this.positions[filter].count
            localStorage.setItem('positions', JSON.stringify(this.positions))
            
        }
    }
    decrementCount(id) {
        if (id != undefined) {
            let filter = this.positions.findIndex(item => item.guid == id)
            if (+this.positions[filter].count > 1) {
                this.positions[filter].count = +this.positions[filter].count - 1
                this.order.products[filter].count = +this.positions[filter].count
                localStorage.setItem('positions', JSON.stringify(this.positions))
            }
        }
    }
    AddPosition(guid, count) {
        let filter = this.positions.findIndex(item => item.guid == guid)
        if (filter == -1) {
            // this.getData(guid, count)    
            this.positions.push({
                count: +count,
                guid: guid
            })
            this.order.products.push({
                count: +count,
                guid: guid
            })
            console.log(this.positions)
            localStorage.setItem('positions', JSON.stringify(this.positions))
        } else {
            this.positions[filter].count = +count
            this.order.products[filter].count = +count
            localStorage.setItem('positions', JSON.stringify(this.positions))
        }
        
    }
    delete(index, id) {
        this.positions = this.positions.filter((it) => {return it.guid != id});
        this.order.products = this.order.products.filter((it) => {return it.guid != id});
        localStorage.setItem('positions', JSON.stringify(this.positions))  
    }

    initialSet(positions) {
        this.positions = positions
        this.order.products = positions
        // this.getInitData(positions)
    }
    setDelivery(value) {
        this.order.delivery = value;
    }
    setPayment(value) {
        this.order.payment = value;
    }
    createDelivery(id, value) {
        if (id == 'city') {
            this.newDelivery.city = value;
        } else if (id == 'street') {
            this.newDelivery.street = value;
        } else if (id == 'house') {
            this.newDelivery.house = value;
        }  else if (id == 'room') {
            this.newDelivery.room = value;
        }
    }
    async addDelivery() {
        let address = '', city = '';

        address = `ул. ${this.newDelivery.street}, д. ${this.newDelivery.house}, кв. ${this.newDelivery.room}`
        city = this.newDelivery.city

        let data = {
            shipping: {
              city: city,
              address_1: address
            },
          };

    }
    setClientData(id, value) {
        console.log(this.order)
        if (id == 'name') {
            this.order.clientData.name = value;
        } else if (id == 'surname') {
            this.order.clientData.surname = value;
        } else if (id == 'phone') {
            this.order.clientData.phone = value;
        } else if (id == 'mail') {
            this.order.clientData.mail = value;
        } else if (id == 'city') {

            this.order.address.city = value;
            console.log(this.order.address.city, id, value)
        } else if (id == 'street') {
            this.order.address.street = value;
        } else if (id == 'house') {
            this.order.address.house = value;
        }  else if (id == 'room') {
            this.order.address.room = value;
        }  else if (id == 'customer_id') {
            this.order.clientData.customer_id = value;
        }
        
    }
    async setOrder() {
        let line_items = []

        this.order.products.forEach(item => {
            line_items.push(item)
        })

        console.log(line_items)

        if (this.order.delivery == 'shop') {
            this.order.address.street = `Коммунистическая`
            this.order.address.house = '25'
            this.order.address.city = 'Лиски'
            this.order.address.room = '1'
        }

        let data = {
            
            data: {
                user_id: HeaderStore.userData.id,
                payment: this.order.payment,
                type: this.order.delivery,
                address: `г. ${this.order.address.city}, ул. ${this.order.address.street}, д. ${this.order.address.house}, кв. ${this.order.address.room}`
            },
            positions: line_items,
          };
        ////key for write


        let IDs = [];

        this.positions.forEach(item => {
            IDs.push(item.guid)
        })


        fetch(`http://${HOST.host}/api/products?limit=20&guid=${IDs.join(',')}`)
        .then(res => res.json())
        .then(json => {

            let total = null

            json?.rows?.map((item, index) => {
                total += +item?.prices_and_count?.price * +this.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count
                console.log(total)
            })

            data.data.total = total

            fetch('http://${HOST.host}/api/orders', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                  localStorage.removeItem('positions')
                  console.log(json)
                  window.location.href = `/completed_order/${json?.id}`
            })

        })
          

        // await api.post('orders', data)
        //     .then( response => {
        //             console.log(response.data)
        //             localStorage.removeItem('positions')
        //             window.location.href = `/completed_order/${response?.data?.id}`
        //         }
        //     ).catch(err => {
        //         console.log(err, err.response?.data)
        //         console.log('fuck')
        //     })
        
    }


}

export default new BusketStore()


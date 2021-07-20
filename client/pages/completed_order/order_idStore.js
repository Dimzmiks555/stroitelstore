import {makeAutoObservable} from 'mobx'
import {useRouter} from 'next/router'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

class Order_IdStore {

    data = {}

    constructor() {
        makeAutoObservable(this);
    }

    async getData() {

        const router = useRouter();

        let {order_id} = router.query

        const api = new WooCommerceRestApi({
            url: "https://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3",
            queryStringAuth: true,
            axiosConfig: {
                headers: {'Content-Type': 'application/json'},
            }
        });
        await api.get("orders", {
            include: order_id,
        })
            .then( result => {
                    this.data = result.data;
                    {console.log(this.data)}
                }
            )
            .catch(err => {console.log(err)})
    }


}

export default new Order_IdStore;
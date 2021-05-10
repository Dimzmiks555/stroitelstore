import { action, makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");
class CategoryStore {
    data = []
    cats = {
        screws: {
            title: 'Саморезы',
            category_id: 27
        },
        bolts: {
            title: 'Болты',
            category_id: 27
        },
        shims: {
            title: 'Шайбы',
            category_id: 27
        },
        drills: {
            title: 'Дрели',
            category_id: 27
        },
        hammers: {
            title: 'Молотки',
            category_id: 27
        },
        paints115: {
            title: 'Краски ПФ-115',
            category_id: 27
        },
        arcs: {
            title: 'Арки',
            category_id: 27
        },
        enterdoors: {
            title: 'Входные двери',
            category_id: 17
        },
        linoleum: {
            title: 'Линолеум',
            category_id: 23
        },
        door_dobors: {
            title: 'Доборы дверные',
            category_id: 28
        },
        kapitels: {
            title: 'Капители',
            category_id: 29
        },
        compl_for_plint: {
            title: 'Компл. для плинтусов',
            category_id: 24
        }
        ,
        compl_for_podokonnik: {
            title: 'Компл. для подоконников',
            category_id: 32
        }
        ,
        door_box: {
            title: 'Коробки дверные',
            category_id: 18
        }
        ,
        laminat: {
            title: 'Ламинат',
            category_id: 21
        }
        ,
        interdoors: {
            title: 'Межкомнатные двери',
            category_id: 26
        }
        ,
        nalichniki: {
            title: 'Наличники дверные',
            category_id: 19
        }
        ,
        plintus: {
            title: 'Плинтус',
            category_id: 20
        }
        ,
        pogonazh: {
            title: 'Погонаж',
            category_id: 31
        }
        ,
        podokonnik: {
            title: 'Подоконники',
            category_id: 22
        }
        ,
        porogi: {
            title: 'Пороги и углы',
            category_id: 25
        }
        ,
        razdvig_system: {
            title: 'Раздвижные системы',
            category_id: 30
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
    async getData(id){
        this.data = []
        const api = new WooCommerceRestApi({
            url: "http://admin.stroitelstore.ru/",
            consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
            consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
            version: "wc/v3"
            });
        await api.get("products", {
                per_page: 18,
                category: id // 18 products per page
            })
            .then(
                action('fetchSuccess', result => {
                    this.data = result.data
                })
            )
        
    }
    clearData(){
        this.data = [];
        this.id = null
    }
}

export default new CategoryStore()


import { action, makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
enableStaticRendering(typeof window === "undefined");

class CategoryStore {

    data = []

    cats = {
        27 : {
            title: 'Саморезы',
            category_id: 27
        },
        27: {
            title: 'Болты',
            category_id: 27
        },
        27: {
            title: 'Шайбы',
            category_id: 27
        },
        27: {
            title: 'Дрели',
            category_id: 27
        },
        27: {
            title: 'Молотки',
            category_id: 27
        },
        27: {
            title: 'Краски ПФ-115',
            category_id: 27
        },
        27: {
            title: 'Арки',
            category_id: 27
        },
        17: {
            title: 'Входные двери',
            category_id: 17
        },
        23: {
            title: 'Линолеум',
            category_id: 23
        },
        28: {
            title: 'Доборы дверные',
            category_id: 28
        },
        29: {
            title: 'Капители',
            category_id: 29
        },
        24: {
            title: 'Компл. для плинтусов',
            category_id: 24
        }
        ,
        32: {
            title: 'Компл. для подоконников',
            category_id: 32
        }
        ,
        18: {
            title: 'Коробки дверные',
            category_id: 18
        }
        ,
        21: {
            title: 'Ламинат',
            category_id: 21
        }
        ,
        26: {
            title: 'Межкомнатные двери',
            category_id: 26
        }
        ,
        19: {
            title: 'Наличники дверные',
            category_id: 19
        }
        ,
        20: {
            title: 'Плинтус',
            category_id: 20
        }
        ,
        31: {
            title: 'Погонаж',
            category_id: 31
        }
        ,
        22: {
            title: 'Подоконники',
            category_id: 22
        }
        ,
        25: {
            title: 'Пороги и углы',
            category_id: 25
        }
        ,
        30: {
            title: 'Раздвижные системы',
            category_id: 30
        }
        ,
        39: {
            title: 'Штукатурка',
            category_id: 39
        }
        ,
        40: {
            title: 'Шпаклевка',
            category_id: 40
        }
        ,
        38: {
            title: 'Цемент',
            category_id: 38
        }
        ,
        37: {
            title: 'Клей для плитки',
            category_id: 37
        }
        ,
        42: {
            title: 'Клей для газоблоков',
            category_id: 42
        }
        ,
        41: {
            title: 'Известь',
            category_id: 41
        }
        ,
        36: {
            title: 'Затирки',
            category_id: 36
        }
        ,
        35: {
            title: 'Алебастр',
            category_id: 35
        }
    }

    constructor() {
        makeAutoObservable(this);
    }
    
    clearData(){
        this.data = [];
        this.id = null
    }
}

export default new CategoryStore()


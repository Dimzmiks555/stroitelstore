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
        ,
        shtukaturka: {
            title: 'Штукатурка',
            category_id: 39
        }
        ,
        spaklevka_smesi: {
            title: 'Шпаклевка',
            category_id: 40
        }
        ,
        cement: {
            title: 'Цемент',
            category_id: 38
        }
        ,
        glue_plitka: {
            title: 'Клей для плитки',
            category_id: 37
        }
        ,
        glue_gazoblock: {
            title: 'Клей для газоблоков',
            category_id: 42
        }
        ,
        izvest: {
            title: 'Известь',
            category_id: 41
        }
        ,
        zatirki: {
            title: 'Затирки',
            category_id: 36
        }
        ,
        alebastr: {
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


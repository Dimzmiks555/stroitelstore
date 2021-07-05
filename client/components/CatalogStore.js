import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CatalogStore {

    props = {
        display: 'none',
        categories: [
            {   
                board: '/catalog/img/metiz.jpg',
                category: 'Крепеж',
                url: '/catalog/screw.svg',
                subcats: [
                    {
                        name: 'Анкера',
                        route: 'ankers',
                        id: 83
                    },
                    {
                        name: 'Болты',
                        route: 'bolts',
                        id: 67
                    },
                    {
                        name: 'Вертлюг',
                        route: 'vertlug',
                        id: 85
                    },
                    {
                        name: 'Гайки',
                        route: 'shims',
                        id: 68
                    },
                    {
                        name: 'Гвозди',
                        route: 'gvozdi',
                        id: 82
                    },
                    {
                        name: 'Дюбеля',
                        route: 'dubels',
                        id: 69
                    },
                    {
                        name: 'Заклёпки',
                        route: 'zaklepki',
                        id: 86
                    },
                    {
                        name: 'Крюки',
                        route: 'hooks',
                        id: 88
                    },
                    {
                        name: 'Пробой-ушки',
                        route: 'proboy_ushki',
                        id: 70
                    },
                    {
                        name: 'Саморезы',
                        route: 'skrews',
                        id: 80
                    },
                    {
                        name: 'Скобы',
                        route: 'skobs',
                        id: 74
                    },
                    {
                        name: 'Шурупы',
                        route: 'shurups',
                        id: 81
                    },
                    {
                        name: 'Шпильки',
                        route: 'shpilki',
                        id: 71
                    },
                    {
                        name: 'Шайбы',
                        route: 'shaibi',
                        id: 84
                    },
                ]
            },
            {
                board: '/catalog/img/doors.jpg',
                category: 'Двери, напольные покрытия',
                url: '/catalog/door.svg',
                subcats: [
                    {
                        name: 'Арки',
                        route: 'arcs',
                        id: 27
                    },
                    {
                        name: 'Входные двери',
                        route: 'enterdoors',
                        id: 17
                    },
                    {
                        name: 'Линолеум',
                        route: 'linoleum',
                        id: 23
                    },
                    {
                        name: 'Доборы дверные',
                        route: 'door_dobors',
                        id: 28
                    },
                    {
                        name: 'Капители',
                        route: 'kapitels',
                        id: 29
                    },
                    {
                        name: 'Компл. для плинтусов',
                        route: 'compl_for_plint',
                        id: 24
                    },
                    {
                        name: 'Компл. для подоконников',
                        route: 'compl_for_podokonnik',
                        id: 32
                    },
                    {
                        name: 'Коробки дверные',
                        route: 'door_box',
                        id: 18
                    },
                    {
                        name: 'Ламинат',
                        route: 'laminat',
                        id: 21
                    },
                    {
                        name: 'Межкомнатные двери',
                        route: 'interdoors',
                        id: 26
                    },
                    {
                        name: 'Наличники дверные',
                        route: 'nalichniki',
                        id: 19
                    },
                    {
                        name: 'Плинтус',
                        route: 'plintus',
                        id: 20
                    },
                    {
                        name: 'Погонаж',
                        route: 'pogonazh',
                        id: 31
                    },
                    {
                        name: 'Подоконники',
                        route: 'podokonnik',
                        id: 22
                    },
                    {
                        name: 'Пороги и углы',
                        route: 'porogi',
                        id: 25
                    },
                    {
                        name: 'Раздвижные системы',
                        route: 'razdvig_system',
                        id: 30
                    },
                ]
            },
            {
                board: '/catalog/img/e-tool.jpg',
                category: 'Электроинструмент',
                url: '/catalog/drill.svg',
                subcats: [
                    {
                        name: 'Дрели',
                        route: 'bolts'
                    },
                    {
                        name: 'Перфораторы',
                        route: 'screws'
                    },
                    {
                        name: 'Бензопилы',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/m-tool.jpg',
                category: 'Ручной инструмент',
                url: '/catalog/hammer.svg',
                subcats: [
                    {
                        name: 'Молотки',
                        route: 'bolts'
                    },
                    {
                        name: 'Отвертки',
                        route: 'screws'
                    },
                    {
                        name: 'Плоскогубцы',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/paint.jpg',
                category: 'Краски и малярный инструмент',
                url: '/catalog/paint-bucket.svg',
                subcats: [
                    {
                        name: 'Краски ПФ-115',
                        route: 'bolts'
                    },
                    {
                        name: 'Аэрозольные краски',
                        route: 'screws'
                    },
                    {
                        name: 'Грунт-эмали',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/cement.jpg',
                category: 'Сухие смеси',
                url: '/catalog/cement.svg',
                subcats: [
                    {
                        name: 'Штукатурка',
                        route: 'shtukaturka',
                        id: 39
                    },
                    {
                        name: 'Шпаклевка',
                        route: 'spaklevka_smesi',
                        id: 40
                    },
                    {
                        name: 'Цемент',
                        route: 'cement',
                        id: 38
                    },
                    {
                        name: 'Клей для плитки',
                        route: 'glue_plitka',
                        id: 37
                    },
                    {
                        name: 'Клей для газоблоков',
                        route: 'glue_gazoblock',
                        id: 42
                    },
                    {
                        name: 'Известь',
                        route: 'izvest',
                        id: 41
                    },
                    {
                        name: 'Затирки',
                        route: 'zatirki',
                        id: 36
                    },
                    {
                        name: 'Алебастр',
                        route: 'alebastr',
                        id: 35
                    },
                ]
            },
            {
                board: '/catalog/img/garden.jpg',
                category: 'Хозяйственный инвентарь',
                url: '/catalog/garden.svg',
                subcats: [
                    {
                        name: 'Анкера',
                        route: 'ankers',
                        id: 83
                    },
                    {
                        name: 'Болты',
                        route: 'bolts',
                        id: 67
                    },
                    {
                        name: 'Вертлюг',
                        route: 'vertlug',
                        id: 85
                    },
                ]
            },
            {
                board: '/catalog/img/sealant.jpg',
                category: 'Клеи, герметики, пены',
                url: '/catalog/sealant-gun.svg',
                subcats: [
                    {
                        name: 'Клеи',
                        route: 'bolts'
                    },
                    {
                        name: 'Герметики',
                        route: 'screws'
                    },
                    {
                        name: 'Пены монтажные',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/lock.jpg',
                category: 'Замочно-скобяные изделия',
                url: '/catalog/lock.svg',
                subcats: [
                    {
                        name: 'Замки',
                        route: 'bolts'
                    },
                    {
                        name: 'Петли',
                        route: 'screws'
                    },
                    {
                        name: 'Задвижки',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/osnastka.jpg',
                category: 'Оснастка и расх. материалы',
                url: '/catalog/saw.svg',
                subcats: [
                    {
                        name: 'Замки',
                        route: 'bolts'
                    },
                    {
                        name: 'Петли',
                        route: 'screws'
                    },
                    {
                        name: 'Задвижки',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/roof.jpg',
                category: 'Кровельные материалы',
                url: '/catalog/roof.svg',
                subcats: [
                    {
                        name: 'Замки',
                        route: 'bolts'
                    },
                    {
                        name: 'Петли',
                        route: 'screws'
                    },
                    {
                        name: 'Задвижки',
                        route: 'shims'
                    },
                ]
            }
        ]
    }

    constructor() {
        makeAutoObservable(this);
    }
    AppendCatalog() {
        this.props.display = 'block';
    }
    HideCatalog() {
        this.props.display = 'none';
    }
}

export default new CatalogStore()


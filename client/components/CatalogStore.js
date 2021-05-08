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
                        name: 'Болты',
                        route: 'bolts'
                    },
                    {
                        name: 'Саморезы',
                        route: 'screws'
                    },
                    {
                        name: 'Шайбы',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/doors.jpg',
                category: 'Двери, напольные покрытия',
                url: '/catalog/door.svg',
                subcats: [
                    {
                        name: 'Двери',
                        route: 'screws'
                    },
                    {
                        name: 'Дверная фурнитура',
                        route: 'shims'
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
                        name: 'Наливной пол',
                        route: 'bolts'
                    },
                    {
                        name: 'Цемент',
                        route: 'screws'
                    },
                    {
                        name: 'Шпатлевка',
                        route: 'shims'
                    },
                ]
            },
            {
                board: '/catalog/img/garden.jpg',
                category: 'Хозяйственный инвентарь',
                url: '/catalog/garden.svg',
                subcats: [
                    {
                        name: 'Тачки',
                        route: 'bolts'
                    },
                    {
                        name: 'Грабли',
                        route: 'screws'
                    },
                    {
                        name: 'Лопаты',
                        route: 'shims'
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


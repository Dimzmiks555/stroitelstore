import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
class CatalogStore {

    props = {
        display: 'none',
        categories: [
            {
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
                category: 'Окна и двери',
                url: '/catalog/door.svg',
                subcats: [
                    {
                        name: 'Окна',
                        route: 'bolts'
                    },
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
                category: 'Краски',
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
                category: 'Сад и огород',
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


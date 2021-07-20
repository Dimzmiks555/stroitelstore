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
                id: 66,
                url: '/catalog/screw.svg',
                
            },
            {
                board: '/catalog/img/doors.jpg',
                category: 'Двери, напольные покрытия',
                url: '/catalog/door.svg',
                id: 16,
            },
            {
                board: '/catalog/img/e-tool.jpg',
                category: 'Электроинструмент',
                id: 90,
                url: '/catalog/drill.svg',
            },
            {
                board: '/catalog/img/m-tool.jpg',
                category: 'Ручной инструмент',
                url: '/catalog/hammer.svg',
                id: 153,
            },
            {
                board: '/catalog/img/paint.jpg',
                category: 'Краски и малярный инструмент',
                url: '/catalog/paint-bucket.svg',
                id: 132,
            },
            {
                board: '/catalog/img/cement.jpg',
                category: 'Сухие смеси',
                id: 34,
                url: '/catalog/cement.svg',
            },
            {
                board: '/catalog/img/garden.jpg',
                category: 'Хозяйственный инвентарь',
                url: '/catalog/garden.svg',
                id: 187,
            },
            {
                board: '/catalog/img/sealant.jpg',
                category: 'Клеи, герметики, пены',
                url: '/catalog/sealant-gun.svg',
                id: 43,
            },
            {
                board: '/catalog/img/lock.jpg',
                category: 'Замочно-скобяные изделия',
                url: '/catalog/lock.svg',
                id: 48,
            },
            {
                board: '/catalog/img/osnastka.jpg',
                category: 'Оснастка и расх. материалы',
                url: '/catalog/saw.svg',
                id: 172,
            },
            {
                board: '/catalog/img/roof.jpg',
                category: 'Кровельные материалы',
                url: '/catalog/roof.svg',
                id: 206,
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


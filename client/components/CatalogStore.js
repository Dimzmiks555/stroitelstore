import { makeAutoObservable } from "mobx"
import { enableStaticRendering } from "mobx-react";
import CatalogItemsStore from './Catalog/CatalogItemsStore.js'
enableStaticRendering(typeof window === "undefined");
class CatalogStore {

    props = {
        display: 'none',
        categories: [
            {   
                board: '/catalog/img/metiz.jpg',
                category: 'Крепеж',
                id: '0fb5fdea-35ed-11eb-9395-18c04d2a3938',
                url: '/catalog/screw.svg',
                
            },
            {
                board: '/catalog/img/doors.jpg',
                category: 'Двери, напольные покрытия',
                url: '/catalog/door.svg',
                id: '2cf30f47-3ecb-11eb-93a4-18c04d2a3938',
            },
            {
                board: '/catalog/img/e-tool.jpg',
                category: 'Электроинструмент',
                id: '3aa745ce-385b-11eb-9399-18c04d2a3938',
                url: '/catalog/drill.svg',
            },
            {
                board: '/catalog/img/m-tool.jpg',
                category: 'Ручной инструмент',
                url: '/catalog/hammer.svg',
                id: '3aa745cf-385b-11eb-9399-18c04d2a3938',
            },
            {
                board: '/catalog/img/paint.jpg',
                category: 'Краски и малярный инструмент',
                url: '/catalog/paint-bucket.svg',
                id: 'ee3fc6c2-3854-11eb-9399-18c04d2a3938',
            },
            {
                board: '/catalog/img/cement.jpg',
                category: 'Сухие смеси',
                id: '49c9eb8c-3f93-11eb-93a5-18c04d2a3938',
                url: '/catalog/cement.svg',
            },
            {
                board: '/catalog/img/garden.jpg',
                category: 'Хозяйственный инвентарь',
                url: '/catalog/garden.svg',
                id: '3aa745d8-385b-11eb-9399-18c04d2a3938',
            },
            {
                board: '/catalog/img/sealant.jpg',
                category: 'Клеи, герметики, пены',
                url: '/catalog/sealant-gun.svg',
                id: '3aa745cc-385b-11eb-9399-18c04d2a3938',
            },
            {
                board: '/catalog/img/lock.jpg',
                category: 'Дверная фурнитура',
                url: '/catalog/lock.svg',
                id: '2cf30f48-3ecb-11eb-93a4-18c04d2a3938',
            },
            {
                board: '/catalog/img/osnastka.jpg',
                category: 'Оснастка и расх. материалы',
                url: '/catalog/saw.svg',
                id: '3aa745d0-385b-11eb-9399-18c04d2a3938',
            },
            {
                board: '/catalog/img/roof.jpg',
                category: 'Кровельные материалы',
                url: '/catalog/roof.svg',
                id: '53b60c08-41f1-11eb-93a8-18c04d2a3938',
            }
        ]
    }

    constructor() {
        makeAutoObservable(this);
    }
    AppendCatalog() {
        this.props.display = 'block';
        CatalogItemsStore.getData(this.props.categories[0].id, this.props.categories[0].board)
    }
    HideCatalog() {
        this.props.display = 'none';
    }
}

export default new CatalogStore()


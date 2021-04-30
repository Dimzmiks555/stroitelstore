import CatalogStore from "./CatalogStore";

import styles from './Catalog.module.css';
import {observer} from "mobx-react";
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
const Catalog = observer(() => {
    return (
        <div className={styles.catalog} style={{display: CatalogStore.catalog.display}}>
            <h1>Каталог</h1>
        </div>
    )
})

export default Catalog
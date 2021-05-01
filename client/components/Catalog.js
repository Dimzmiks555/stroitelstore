import CatalogStore from "./CatalogStore";
import {CSSTransition} from 'react-transition-group'
import styles from './Catalog.module.css';
import {observer} from "mobx-react";
import { enableStaticRendering } from "mobx-react";
enableStaticRendering(typeof window === "undefined");
const Catalog = observer(() => {
    function handleClick() {
        CatalogStore.HideCatalog()
    };
    if (CatalogStore.props.display == 'none'){
        return null
    } else {
        return (
            <>
                <CSSTransition transitionName="catalog" transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                    <div className={styles.catalog}>
                        <button className={styles.close} onClick={handleClick}>&#215;</button>
                        <h1>Каталог</h1>
                        <div className={styles.catalog__items}>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Метизы</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Ручной инструмент</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Кровля</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Сухие смеси</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Краски</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                            <div className={styles.metiz}>
                                <div className={styles.info}>
                                    <div className={styles.icon}>
                                        <img src="/catalog/screw.svg" />
                                    </div>
                                    <h3>Электро инструмент</h3>
                                </div>
                                <div className={styles.panel}>
                    
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                
            </>
        )
    }
    
})

export default Catalog
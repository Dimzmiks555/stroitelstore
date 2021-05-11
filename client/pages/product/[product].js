import Header from '../../components/Header';
import Mainstyles from '../index.module.css';
import styles from './product.module.css'
import Catalog from "../../components/Catalog";
import ProductStore from './productStore'
import { useRouter} from 'next/router'
import { useEffect } from 'react'
import { observer } from 'mobx-react';
import Footer from '../../components/Footer';

const Product = observer(() => {
        
        const router = useRouter(); 
        
        let product_id = router.query.product;
        
        console.log(product_id)
    useEffect(() => {
        
        if (product_id != undefined) {  
            ProductStore.getData(product_id);
        }


        return function cleanup() {
            ProductStore.clearData();
        }

    }, []);

    return (
        <>
        <Catalog />
        <Header />
        <div className={Mainstyles.page}>
            <a className={styles.back_button} onClick={() => router.back()}>
            ← Назад
            </a>
            <div className={styles.product}>
                <div className={styles.product__overview}>
                    <div className={styles.product__overview_img}>
                        <img src={ProductStore.data?.images ? ProductStore.data?.images[0]?.src : null}></img>
                    </div>
                    <div className={styles.product__overview_info}>
                        <div className={styles.product__overview_title}>
                            <h1>{ProductStore.data?.name}</h1>
                            <h4>Артикул: {ProductStore.data?.sku}</h4>
                        </div>
                        <div className={styles.product__overview_price}>
                            {ProductStore.data.price ? (<p><span>{Number(ProductStore.data?.price).toLocaleString()}</span> ₽ / шт.</p>) : <p>Цена по запросу</p>} 
                        </div>
                        <div className={styles.product__overview_cart}>
                            <button>
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.product__infoblock}>
                    <div className={styles.product__description}>
                        <h2>
                            Описание
                        </h2>
                        <p>
                            Рекомендуется для работ по сложным основаниям: старым плиточным покрытиям, нагреваемым поверхностям и пр. Предназначен для наружной облицовки зданий выше цокольной части, плиточных работ во внутренних помещениях с нормальной и повышенной влажностью; для ванных комнат, балконов и террас.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}) 

export default Product  
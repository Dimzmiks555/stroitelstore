import Header from '../../components/Header';
import Mainstyles from '../index.module.css';
import styles from './product.module.css'
import Catalog from "../../components/Catalog";

export default function Category() {
    return (
        <>
        <Catalog />
        <Header />
        <div className={Mainstyles.page}>
            
            <div className={styles.product}>
                <div className={styles.product__overview}>
                    <div className={styles.product__overview_img}>
                        <img src='/good/unis.jpg'>
                        </img>
                    </div>
                    <div className={styles.product__overview_info}>
                        <div className={styles.product__overview_title}>
                            <h1>ЮНИС ПЛЮС</h1>
                            <h4>Артикул: 43438492</h4>
                        </div>
                        <div className={styles.product__overview_price}>
                            400 ₽ / шт.
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
        </>
    )
}

import Header from '../../../components/Header';
import Mainstyles from '../../index.module.css';
import styles from './category.module.css'
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router'

export default function Category() {
    const router = useRouter();
    const { index, category } = router.query;
    return (
        <div className={Mainstyles.page}>
            <Catalog />
            <Header />
            <div className={styles.category}>
                <div className={styles.category_main}>
                    <div className={styles.category_filter}>
                        <div className={styles.filter_price}>
                            <div className={styles.filter_title}>Цена</div>
                            <div className={styles.filter_inputs}>
                                <input placeholder="От"></input>
                                <input placeholder="До"></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            
                            <h1>Болты</h1>
                            <div>
                                200 товаров
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/unis.jpg"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Юнис Плюс
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        344 ₽
                                    </div>
                                    <a className={styles.to_cart}>
                                        В корзину
                                    </a>
                                </div>
                            </div>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/topor.jpg"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Топор, 600 г, фибергласовое топорище Сибртех

                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        784 ₽
                                    </div>
                                    <button className={styles.to_cart}>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/screw.png"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Саморез Ш.Г.К 4,8*19 Желт. ( 400шт) RAL1018 Daxmer/10
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        889.20 ₽
                                    </div>
                                    <button className={styles.to_cart}>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/unis.jpg"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Юнис Плюс
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        344 ₽
                                    </div>
                                    <button className={styles.to_cart}>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/unis.jpg"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Юнис Плюс
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        344 ₽
                                    </div>
                                    <button className={styles.to_cart}>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                            <div className={styles.category_good}>
                                <div>
                                    <div className={styles.good_img}>
                                        <img src="/good/unis.jpg"></img>
                                    </div>
                                    <div className={styles.good_title}>
                                        Юнис Плюс
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        344 ₽
                                    </div>
                                    <button className={styles.to_cart}>
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

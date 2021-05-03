import Header from '../../../components/Header';
import Mainstyles from '../../index.module.css';
import styles from './category.module.css'
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import CategoryStore from './categoryStore.js'
export default function Category() {
    const router = useRouter();
    const { index, category } = router.query;
    return (
        <>
        <Catalog />
        <Header />
        <div className={Mainstyles.page}>
            
            <div className={styles.category}>
                <div className={styles.category_main}>
                    <div className={styles.category_filter}>
                        <div className={styles.filter_price}>
                            <div className={styles.filter_title}>Цена</div>
                            <div className={styles.filter_inputs}>
                                <div>
                                    <input placeholder="От"></input>
                                    <p>₽</p>
                                </div>
                                <div>
                                    <input placeholder="До"></input>
                                    <p>₽</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter_brend}>
                            <div className={styles.filter_title}>Бренд</div>
                            <div className={styles.filter_checkboxes}>
                                <div>
                                    <input type="checkbox"></input>
                                    <label> UNIS </label>
                                </div>
                                <div>
                                    <input type="checkbox"></input>
                                    <label> Волма </label>
                                </div>
                                <div>
                                    <input type="checkbox"></input>
                                    <label> Эталон </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            
                            <h1>{CategoryStore.cats[category].title}</h1>
                            <div>
                                200 товаров
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            <div className={styles.category_good}>
                                <div>
                                    <Link href="/product/unis-plus">
                                        <a>
                                            <div className={styles.good_img}>
                                                <img src="/good/unis.jpg"></img>
                                            </div>
                                        </a>
                                    </Link>
                                    <Link href="/product/unis-plus">
                                        <a>
                                            <div className={styles.good_title}>
                                                Юнис Плюс
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                                <div>
                                    <div className={styles.good_price}>
                                        344 ₽ / шт.
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
                                        784 ₽ / шт.
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
                                        889.20 ₽ / шт.
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
                                        344 ₽ / шт.
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
                                        344 ₽ / шт.
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
                                        344 ₽ / шт.
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
        </>
    )
}

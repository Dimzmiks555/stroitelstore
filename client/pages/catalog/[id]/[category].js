import CategoryStore from '../../../components/Catalog/category/categoryStore.js'
import Header from '../../../components/Header';
import Mainstyles from '../../index.module.css';
import styles from './category.module.css'
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { observer } from "mobx-react";
import { useEffect } from 'react';
import { get } from 'mobx';
const Category = observer(({mainTitle, CatID, data}) => {
    const router = useRouter()
        let cat_id = router.query.id
    
    useEffect(() => {
        CategoryStore.getData(cat_id);


        return function cleanup() {
            CategoryStore.clearData();
        }

    }, []);
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
                            
                            <h1>{mainTitle}</h1>
                            <div>
                                200 товаров
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            {CategoryStore.data.map(item => (
                                <div className={styles.category_good}>
                                    
                                    {console.log(item)}
                                    <div>
                                        <Link href="/product/unis-plus">
                                            <a>
                                                <div className={styles.good_img}>
                                                    <img src={item?.images[0]?.src}></img>
                                                </div>
                                            </a>
                                        </Link>
                                        <Link href="/product/unis-plus">
                                            <a>
                                                <div className={styles.good_title}>
                                                    {item.name}
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div>
                                        <div className={styles.good_price}>
                                            {
                                                item.price != '' ? (<p><span>{item.price}</span> ₽ / шт.</p>) : <b>По запросу</b>
                                            }
                                        </div>
                                        <a className={styles.to_cart}>
                                            В корзину
                                        </a>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}) 




export async function getServerSideProps({ params: { category } }) {
        
    const mainTitle = CategoryStore.cats[category].title;

    return {
      props: {
        mainTitle
      },
    }
  }

export default Category
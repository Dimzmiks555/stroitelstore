import CategoryStore from '../../components/Catalog/category/categoryStore.js'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Header from '../../components/Header';
import Mainstyles from '../index.module.css';
import styles from './category.module.css'
import Catalog from "../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from "mobx-react";
const Category = observer(({mainTitle}) => {


    const api = new WooCommerceRestApi({
        url: "http://kassa1/wordpress",
        consumerKey: "ck_841d881edc4d8a0fbded1a632f8f1438efb8cfee",
        consumerSecret: "cs_a373ad07206d189c841c0b48d029e992d1cde50d",
        version: "wc/v3"
      });
      api.get("products", {
        per_page: 18, // 18 products per page
      })
        .then((response) => {
          // Successful request
            console.log(response);
        })
        .catch((error) => {
          // Invalid request, for 4xx and 5xx statuses
        })
        .finally(() => {
          // Always executed.
        });
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
}) 


export async function getStaticPaths() {
    // Add your logic to fetch all products by category

    return {
        paths: [
            // For each category/product combination you would have an entry like the following:
            {
                params: {
                    category: 'bolts'
                }
            },
            {
                params: {
                    category: 'shims'
                }
            },
            {
                params: {
                    category: 'screws'
                }
            },
            {
                params: {
                    category: 'paints115'
                }
            },
        ],
        fallback: false
  };
}

export async function getStaticProps({ params: { category } }) {
    // // Call an external API endpoint to get posts.
    // // You can use any data fetching library
    // const api = new WooCommerceRestApi({
    //     url: "http://example.com",
    //     consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     version: "wc/v3"
    //   });
    const mainTitle = CategoryStore.cats[category].title
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        mainTitle,
      },
    }
  }

export default Category
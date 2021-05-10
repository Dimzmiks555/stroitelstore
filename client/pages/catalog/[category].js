import CategoryStore from '../../components/Catalog/category/categoryStore.js'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Header from '../../components/Header';
import Mainstyles from '../index.module.css';
import styles from './category.module.css'
import Catalog from "../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from "mobx-react";
const Category = observer(({mainTitle, CatID}) => {


    
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
                        {console.log(CategoryStore.data)}
                        <div className={styles.category_goods}>
                            {CategoryStore.data.map(item => (
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
                                                    {item.name}
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
                            ))}
                            
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
            {
                params: {
                    category: 'arcs'
                }
            },
        ],
        fallback: false
  };
}
function GetData(CatID) {
    const api = new WooCommerceRestApi({
        url: "http://admin.stroitelstore.ru/",
        consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
        consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
        version: "wc/v3"
      });
    api.get("products", {
        per_page: 18,
        category: CatID // 18 products per page
      })
      .then((result) => {
        CategoryStore.getData(result.data)
      })
} 

export async function getStaticProps({ params: { category } }) {
    // // Call an external API endpoint to get posts.
    // // You can use any data fetching library
    // const api = new WooCommerceRestApi({
    //     url: "http://example.com",
    //     consumerKey: "ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     consumerSecret: "cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //     version: "wc/v3"s
    //   });
    
    const mainTitle = CategoryStore.cats[category].title;
    const CatID = CategoryStore.cats[category].category_id;
    GetData(CatID);
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        mainTitle,
        CatID,
      },
    }
  }

export default Category
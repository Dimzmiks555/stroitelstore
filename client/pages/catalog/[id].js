import CategoryStore from '../../components/Catalog/category/categoryStore.js'
import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './category.module.css'
import Catalog from "../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Footer from '../../components/Footer/Footer';
import BusketStore from '../../components/Busket/BusketStore.js';


const Category = observer(({mainTitle}) => {
    const router = useRouter()
    let cat_id = router.query.id
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState([true]);

    function handleClick(e) {
        BusketStore.AddPosition(e.target.id, 1)
    }
    
    useEffect(() => {
        setLoading(true)
        async function getData(id){
            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3"
                });
            await api.get("products", {
                    per_page: 20,
                    order: 'asc',
                    category: id // 18 products per page
                })
                .then( result => {
                        setData(result.data)
                        setLoading(false)
                    }
                )
            
        }
        
        getData(cat_id);


    }, [cat_id]);
    if (isLoading == true) {
        return (
            <>
                <Catalog />
                <Header />
                <div className={styles.LoadingPanel}>
                    <img src='/spinning-circles.svg'></img>
                </div>
            </>
        )
    } else {


    function GetButton(pos) {
        if (pos.stock_status == 'outofstock') 
        {       
            return <a className={styles.outofstock}>Под заказ</a>
        } else 
        {
            return <a id={pos.id} className={styles.to_cart} onClick={handleClick}>В корзину</a>
        }
    }

        
    
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
                            {data.map(item => (
                                <div key={item.id} className={styles.category_good}>
                                    
                                    <div>
                                        <Link href={`/product/${item.id}`}>
                                            <a>
                                                <div className={styles.good_img}>
                                                    <img src={item?.images[0]?.src}></img>
                                                </div>
                                            </a>
                                        </Link>
                                        <Link href={`/product/${item.id}`}>
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
                                                item.price != '' ? (<p><span>{Number(item.price).toLocaleString()}</span> ₽ / шт.</p>) : <b>По запросу</b>
                                            }
                                        </div>
                                        {GetButton(item)}
                                        
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
}) 




export async function getServerSideProps({ params: { id } }) {
        
    const mainTitle = CategoryStore.cats[id].title;

    return {
      props: {
        mainTitle
      },
    }
  }

export default Category
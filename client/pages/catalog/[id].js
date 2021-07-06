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
    let {id, sort} = router.query
    const [data, setData] = useState([]);
    let items = [];
    if (data != undefined) {
        Object.assign(items, data)
    }
    const [isLoading, setLoading] = useState([true]);
    let dataF;
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
                    per_page: 100,
                    order: 'asc',
                    category: id,
                    stock_status: 'instock'// 18 products per page
                })
                .then( result => {
                        setData(result.data)
                        setLoading(false)
                    }
                )

                
        }
        
        getData(id);


    }, [id]);
    
    useEffect(() => {
        if (data != undefined) {
            Object.assign(items, data)
        }
    },[data])
    
    function GetButton(pos) {
        if (pos.stock_status == 'outofstock') 
        {       
            return <a className={styles.outofstock}>Под заказ</a>
        } else 
        {
            return (
                <Link href={`/product/${pos.id}`}>
                    <a id={pos.id} className={styles.to_cart} >Подробнее</a>
                </Link>
                )
        }
    }
    function handleSelect(e) {
        if (e.target.value == 'priceUp') {
            router.push(`./${id}?sort=asc`)
        } else if (e.target.value == 'priceDown') {
            router.push(`./${id}?sort=desc`)
        } else if (e.target.value == 'default') {
            router.push(`./${id}`)
        }
    } 
    function showGoods() {
        let result;
        if (sort == undefined) {
            dataF = data;
            console.log(data, dataF, items)
        } else if (sort == 'asc') {
            dataF = items?.sort((a, b) => {
                return a.price - b.price
            })
        } else if (sort == 'desc') {
            dataF = items?.sort((a, b) => {
                return b.price - a.price
            })
        }
        result = dataF.map(item => {
            return (
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
            )
        })
        return result
    }
    useEffect(() => {
        showGoods()
    }, [dataF])
    if (isLoading == true) {
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
                            </div>
                            <div className={styles.category_goods}>
                                
                            <div className={styles.LoadingPanel}>
                                <img src='/spinning-circles.svg'></img>
                            </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    } else {

    
    
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
                            <h1>{data[0]?.categories[0].name}</h1>
                            <div className={styles.toolbar}>
                                <div>
                                    {data.length} товаров
                                </div>
                                <div className={styles.sorter}>
                                    <p>Сортировка</p>
                                    <select onChange={e => handleSelect(e)}>
                                        <option value="default">По умолчанию</option>
                                        <option value="priceUp">По возрастанию цены</option>
                                        <option value="priceDown">По убыванию цены</option>
                                        <option>А - Я</option>
                                        <option>Я - А</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            {showGoods()}
                            
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
        

    return {
      props: {
      },
    }
  }

export default Category
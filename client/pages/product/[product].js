import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './product.module.css'
import Catalog from "../../components/Catalog";
import ProductStore from '../../components/Product/productStore'
import { useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Footer from '../../components/Footer/Footer';
import BusketStore from '../../components/Busket/BusketStore';

const Product = observer(() => {
    
    const [added, setAdded] = useState(false);
    const router = useRouter(); 
    const [data, setData] = useState([]);
    const [counter_value, setCV] = useState([1]);
    const [isLoading, setLoading] = useState([true]);

    function handleClick(e) {
        BusketStore.AddPosition(e.target.id, counter_value)
        setAdded(true);
        
    }   
    function handleChange(e) {
        
        if (e.target.value > 0 || e.target.value == '' && e.target.value != 'e') {
            setAdded(false);
            setCV(e.target.value)
        } 

    }
    function increment() {
        setAdded(false);
        setCV(+counter_value + 1)
    }
    function decrement() {
        setAdded(false);
        if(+counter_value != 1) {
            setCV(+counter_value - 1)
        }
    }



    let product_id = router.query.product;
    useEffect(() => {
        let filter = BusketStore.positions.findIndex(item => item.id == product_id)
        if (filter == -1) {
            setAdded(false)
            setCV(1)
        } else {
            setAdded(true)
            setCV(BusketStore.positions[filter].count)
        }
        async function getData(id){
            setLoading(true)
            setData([]) 
            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3",
                queryStringAuth: true,
                axiosConfig: {
                    headers: {'Content-Type': 'application/json'},
                    }
                });
            await api.get(`products/${id}`)
                .then( result => {
                        setData(result.data);
                        setLoading(false)
                    }
                )
            
        }
        
        if (product_id != undefined) {  
            getData(product_id);
        }

    }, [product_id]);


    function renderThis() {
        if (isLoading == true) {
            return (
                <div className={Mainstyles.page}>
                    <div className={styles.LoadingPanel}>
                        <img src='/spinning-circles.svg'></img>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={Mainstyles.page}>
                    <a className={styles.back_button} onClick={() => router.back()}>
                    ⟵
                    </a>
                    <div className={styles.product}>
                        <div className={styles.product__overview}>
                            <div className={styles.product__overview_img}>
                                <img src={data?.images ? data?.images[0]?.src : null}></img>
                            </div>
                            <div className={styles.product__overview_info}>
                                <div className={styles.product__overview_title}>
                                    <h1>{data?.name}</h1>
                                    <h4>Артикул: {data?.sku}</h4>
                                </div>
                                <div className={styles.product__overview_price}>
                                    {data.price ? (<p><span>{Number(data?.price).toLocaleString()}</span> ₽ / шт.</p>) : <p>Цена по запросу</p>} 
                                </div>
                                <div className={styles.product__to_cart__block}>
                                    <div className={styles.product__counter}>
                                        <button onClick={increment}>
                                            +
                                        </button>
                                        <input value={counter_value} onChange={e => {handleChange(e)}} type="number" min="1">
                                        </input>
                                        <button onClick={decrement}>
                                            −
                                        </button>
                                    </div>
                                    {
                                        added === false ? (
                                            <div className={styles.product__overview_cart}>
                                                <button id={data?.id} onClick={e => {handleClick(e)}}>
                                                    В корзину
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={styles.product__overview_cart_added} disabled>
                                                <button id={data?.id} onClick={e => {handleClick(e)}}>
                                                    Добавлено
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                                
                            </div>
                        </div>
                        <div className={styles.product__infoblock}>
                            <div className={styles.product__description}>
                                <h2>
                                    Описание
                                </h2>
                                <p>Описание отсутствует.</p>
                                <h2>
                                    Характеристики
                                </h2>
                                <p>Характеристики отсутствуют.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
        <Catalog />
        <Header />
            {renderThis()}
        <Footer />
        </>
    )
}) 

export default Product  
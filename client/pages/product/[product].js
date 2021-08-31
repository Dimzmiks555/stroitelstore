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
        console.log(e.target.id)
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

    if (typeof window !== "undefined") {
        window.addEventListener('scroll', () => {
            if (document.getElementById('product__overview_img') !== null) {
                let totalBlock = document.getElementById('product__overview_img')
                let mainBlock = document.getElementById('product__overview_info')
                let scrollHeight = document.body.scrollHeight;
                let y = window.pageYOffset;
                // console.log(scrollHeight,mainBlock.offsetHeight )
                // console.log(y)
                    if (y >= 150 && y <= (scrollHeight - mainBlock.offsetHeight)) {
                        totalBlock.style.position = 'fixed';
                        totalBlock.style.top = '80px';
                        totalBlock.style.left = '10%';
                        totalBlock.style.width = '43.6%'
                        mainBlock.style.marginLeft = '54.5%'
                    } else if (y > (scrollHeight - mainBlock.offsetHeight)){
                        console.log('bolshe')
                        totalBlock.style.position = 'fixed';
                        mainBlock.style.marginLeft = '54.5%'
                        totalBlock.style.bottom = '500px';
                        totalBlock.style.left = '10%';
                        totalBlock.style.width = '43.6%'
                    }
                    else {
                        totalBlock.style = null;
                        mainBlock.style = null
                    }
            }
            
        })
    } 

    let product_id = router.query.product;
    useEffect(() => {
        let filter = BusketStore.positions.findIndex(item => item.guid == product_id)
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
            fetch(`http://localhost:80/api/products/${id}`)
            .then(result => result.json())
            .then(json => {
                console.log(json[0])
                setData(json[0]);
                setLoading(false)
            })
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
                            <div className={styles.product__overview_img} id="product__overview_img">
                                {/* <img src={data?.images ? data?.images[0]?.src : null}></img> */}
                            </div>
                            <div className={styles.product__overview_info} id="product__overview_info">
                                <div className={styles.product__overview_title}>
                                    <h1>{data?.title}</h1>
                                    <h4>Артикул: {data?.prices_and_count?.sku}</h4>
                                </div>
                                <div className={styles.product__overview_price}>
                                    {data?.prices_and_count?.price ? (<p><span>{(+data?.prices_and_count?.price).toLocaleString()}</span> ₽ / шт.</p>) : <p>Цена по запросу</p>} 
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
                                                <button id={data?.guid} onClick={e => {handleClick(e)}}>
                                                    В корзину
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={styles.product__overview_cart_added} disabled>
                                                <button id={data?.guid} onClick={e => {handleClick(e)}}>
                                                    Добавлено
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={styles.product__infoblock}>
                                    <div className={styles.product__description}>
                                        <h2>
                                            Характеристики
                                        </h2>
                                        
                                        <div className={styles.attributes}>
                                            {
                                                data?.filter_1?.length > 0 ? data?.filter_1?.map(item => (
                                                    <div className={styles.attribute}>
                                                        <div>
                                                            {item?.attribute?.title}
                                                        </div>
                                                        <div>
                                                            {item?.value}
                                                        </div>
                                                    </div>
                                                )) : 'Характеристики отсутствуют'
                                            }
                                        </div>

                                        <h2>
                                            Описание
                                        </h2>
                                        <div>{data?.desc?.text ? data?.desc?.text : 'Описание отсутствует.'}</div>

                                    </div>
                                </div>
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
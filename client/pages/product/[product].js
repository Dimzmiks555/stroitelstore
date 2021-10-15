import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './product.module.css'
import Catalog from "../../components/Catalog";
import ProductStore from '../../components/Product/productStore'
import { useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import Link from 'next/link'
import Head from 'next/head';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import Footer from '../../components/Footer/Footer';
import BusketStore from '../../components/Busket/BusketStore';
import HOST from '../../HOST';
const Product = observer(({data, group, parent_group}) => {
    
    const [added, setAdded] = useState(false);
    const router = useRouter(); 
    const [image, setImage] = useState('');
    const [counter_value, setCV] = useState([1]);
    const [isLoading, setLoading] = useState([true]);
    // const [parentGroup, setParentGroup] = useState({})
    // const [group, setGroup] = useState({})

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

        setImage(data?.images?.length > 0 ? data?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg')

        if (typeof window !== 'undefined') {
            let recent_goods = localStorage.getItem('recentGoods')
            let new_recent_goods = []


            if (recent_goods == null) {
                new_recent_goods.push(product_id)
                localStorage.setItem('recentGoods', JSON.stringify(new_recent_goods))


            } else {

                recent_goods = JSON.parse(recent_goods)


                console.log(recent_goods)

                if (recent_goods.includes(product_id) != true && recent_goods.length < 10) {
                    new_recent_goods = [...recent_goods, product_id]

                    localStorage.setItem('recentGoods', JSON.stringify(new_recent_goods))
                } else if (recent_goods.includes(product_id) != true && recent_goods.length >= 10) {
                    recent_goods.shift()
                    new_recent_goods = [...recent_goods, product_id]

                    localStorage.setItem('recentGoods', JSON.stringify(new_recent_goods))
                }

            }


        }



    }, [product_id, data]);


    function handleHover(e) {
        setImage(e)
    }


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
                                <div className={styles.product__overview_main_img}>
                                    <img alt="" src={`${HOST.host}/uploads/${data?.images?.length > 0 ? image : 'empty.jpeg'}`}></img>
                                </div>
                                {
                                    data?.images?.length > 0 && (
                                        <div className={styles.gallery}>
                                            {
                                                data?.images?.map(image => (
                                                    <img alt="" onMouseEnter={e => handleHover(image?.url)} src={`${HOST.host}/uploads/${image?.url}`}></img>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.product__overview_info} id="product__overview_info">
                            <div className={styles.breadcrumbs}><Link href='/categories'><a>Каталог</a></Link> / <Link href={`/categories/${parent_group?.guid}`}><a>{parent_group?.title}</a></Link> / <Link href={`/catalog/${group?.guid}/1`}><a>{group?.title}</a></Link> </div>
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
                                         data?.prices_and_count?.amount == 0 ? (
                                            <div className={styles.product__overview_cart}>
                                                <button id={data?.guid} style={{background: '#aaa'}} >
                                                    Под заказ
                                                </button>
                                            </div>
                                        ) :
                                        added === false ? (
                                            <div className={styles.product__overview_cart}>
                                                <button id={data?.guid} onClick={e => {handleClick(e)}}>
                                                    В корзину
                                                </button>
                                            </div>
                                        ) :  (
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
        <Head>
            <title>СТРОИТЕЛЬ - {data?.title}</title>
            <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
            <meta name='keywords' content={`магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин, ${data?.title}  `}></meta>
        </Head>
        <Catalog />
        <Header />
            {renderThis()}
        <Footer />
    <MobileMenu></MobileMenu>
        </>
    )
}) 

export default Product  



export async function getServerSideProps({params}) {

    const result = await fetch(`${HOST.host}/api/products/${params?.product}`);
    let json = await result.json();

    let data = json[0]

    let group = json[0]?.group

    let parent_id = json[0]?.group?.parent_group


    const groups = await fetch(`${HOST.host}/api/groups`);
    
    const grjson = await groups.json();
    let parent_group = grjson?.rows?.filter(item => item.guid == parent_id)[0]


    return {
        props: {
            data, group, parent_group
        }
    }

    
}
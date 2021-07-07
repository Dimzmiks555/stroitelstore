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
import Select from 'react-select'
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import 'rc-slider/assets/index.css';


const Category = observer(({mainTitle}) => {

    // Router
    const router = useRouter()
    let {id, sort} = router.query

    //UseState
    const [data, setData] = useState([]);
    const [prices, setPrices] = useState([]);
    const [isLoading, setLoading] = useState([true]);

    // Lets
    let items = [];
    let dataF;

    if (data != undefined) {
        Object.assign(items, data)
    }
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
                        let arr = [];
                        result.data.forEach(item => {
                            arr.push(+item.price)
                        });
                        setData(result.data)
                        setPrices([Math.min(...arr),Math.max(...arr)])
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
    function handleSelect(value) {
        if (value.value == 'priceUp') {
            router.push(`./${id}?sort=asc`)
        } else if (value.value == 'priceDown') {
            router.push(`./${id}?sort=desc`)
        } else if (value.value == 'default') {
            router.push(`./${id}`)
        }
        
    } 
    function showGoods() {
        let result;
        if (sort == undefined) {
            dataF = data;
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
                    <div className={styles.LoadingPanel}>
                                <img src='/spinning-circles.svg'></img>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )
    } else {

    const options = [
        { value: 'default', label: 'По умолчанию' },
        { value: 'priceUp', label: 'По возрастанию цены' },
        { value: 'priceDown', label: 'По уменьшению цены' }
    ]
    
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
                            <div>
                                {/* <InputNumber></InputNumber><InputNumber></InputNumber> */}
                            </div>
                            {/* <Slider range min={prices[0]} max={prices[1]} defaultValue={[0, prices[1]]}/> */}
                            <Range
                             trackStyle={[{ backgroundColor: '#f5f5f5' }]} 
                             handleStyle={[{ backgroundColor: '#c33', borderColor:'#e88'}]}
                             activehandleStyle={[{ backgroundColor: 'gray', borderColor:'blue'}]}
                             railStyle={{ backgroundColor: 'black'}}
                             min={prices[0]} 
                             max={prices[1]} 
                             defaultValue={[0, prices[1]]}
                             />
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
                                    <Select className={styles.select} options={options} placeholder='Сортировка' onChange={e => handleSelect(e)}></Select>
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
import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from '../catalog/[id]/category.module.css'
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


const Search = observer(({mainTitle}) => {

    // Router
    const router = useRouter()
    let {request, sort} = router.query

    //UseState
    const [data, setData] = useState([]);
    const [prices, setPrices] = useState([]);
    const [priceFilter, setPriceFilters] = useState([]);
    const [isLoading, setLoading] = useState([true]);

    // Lets
    let items = [];
    let dataF;

    if (data != undefined) {
        Object.assign(items, data)
    }
    
    useEffect(() => {
        async function getData(id){
           
            fetch(`http://localhost:80/api/products?search=${id}`)
            .then(result => result.json())
            .then(json => setData(json))
                
        }
        
        getData(request);


        

    }, [request]);
    
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
                <Link href={`/product/${pos.guid}`}>
                    <a id={pos.id} className={styles.to_cart} >Подробнее</a>
                </Link>
                )
        }
    }
    function handleSelect(value) {
        if (value.value == 'priceUp') {
            router.push(`./${request}?sort=asc`)
        } else if (value.value == 'priceDown') {
            router.push(`./${request}?sort=desc`)
        } else if (value.value == 'default') {
            router.push(`./${request}`)
        }
        
    } 
    function handleRange(values) {
        setPriceFilters(values)
        let result = dataF.filter(item => {
            if (item.price >= values[0] && item.price <= values[1]) {
                return true
            }
        }) 
        dataF = result;
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
                <div key={item.guid} className={styles.category_good}>
                
                <div>
                    <Link href={`/product/${item.guid}`}>
                        <a>
                            <div className={styles.good_img}>
                                {/* <img src={item?.images[0]?.src}></img> */}
                            </div>
                        </a>
                    </Link>
                    <Link href={`/product/${item.guid}`}>
                        <a>
                            <div className={styles.good_title}>
                                {item.title}
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
                            <div className={styles.filter_inputs}>
                                <input value={priceFilter[0]} defaultValue={prices[0]}></input>
                                <input value={priceFilter[1]} defaultValue={prices[1]}></input>
                            </div>
                            <Range
                             trackStyle={[{ backgroundColor: '#c33' }]} 
                             handleStyle={[{ backgroundColor: '#fff', borderColor:'#c33'}]}
                             railStyle={{ backgroundColor: 'f5f5f5'}}
                             min={prices[0]} 
                             max={prices[1]} 
                             defaultValue={[0, prices[1]]}
                             onChange={e => handleRange(e)}
                             />
                        </div>
                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            <h1>Поиск по запросу: {request}</h1>
                            <div className={styles.toolbar}>
                                <h3>
                                    {data.length} товаров
                                </h3>
                                
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



export default Search
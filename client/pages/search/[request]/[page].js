import Header from '../../../components/Header/Header';
import Mainstyles from '../../index.module.css';
import styles from '../../catalog/[id]/category.module.css'
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Footer from '../../../components/Footer/Footer';
import BusketStore from '../../../components/Busket/BusketStore.js';
import Select from 'react-select'
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import 'rc-slider/assets/index.css';


const Search = observer(({mainTitle}) => {

    // Router
    const router = useRouter()
    let {request, page} = router.query

    //UseState
    const [data, setData] = useState([]);
    const [prices, setPrices] = useState([]);
    const [order, setOrder] = useState('');
    const [priceFilter, setPriceFilters] = useState([]);
    const [isLoading, setLoading] = useState([true]);
    const [URLParams, setURLParams] = useState(router.query);
    const [goodPrices, setGoodPrices] = useState([]);

    let paginationCount = [1]
    let count = +data?.count
    for (let i = count; i > 20; i = i - 20) {
        if (paginationCount.length == '0') {
            return;
        } else {
            paginationCount.push(`${+paginationCount.length + 1}`   )
        }
    }
    
    useEffect(() => {

        setURLParams(router.query)

        async function getData(request, params){
           
            let parametrs = Object.entries(params)



            function generate(parametrs) {
                let string =''
                parametrs.forEach((item, index) => {
                    if(index == 0) {
                        string = `&${item[0]}=${item[1]}`
                    } else {
                        string = string + `&${item[0]}=${item[1]}`
                    }
                })
                return string
            }



            fetch(`http://${HOST.host}/api/products?page=1&limit=20&search=${request}${generate(parametrs)}`)
            .then(result => result.json())
            .then(json => setData(json))
                
        }
        

        async function getGoodPrices(request, params){
           
            let parametrs = Object.entries(params)



            function generate(parametrs) {
                let string =''
                parametrs.forEach((item, index) => {
                    if(index == 0) {
                        string = `&${item[0]}=${item[1]}`
                    } else {
                        string = string + `&${item[0]}=${item[1]}`
                    }
                })
                return string
            }



            fetch(`http://${HOST.host}/api/products_prices?page=${page}&limit=20&search=${request}${generate(parametrs)}`)
            .then(res => res.json())
            .then(json => {
                setGoodPrices(json[0])
            })

            setLoading(false)

                
        }
        
        let params = {}
        Object.assign(params, router.query)
        delete params['request']
        delete params['page']

        getData(request, params);
        getGoodPrices(request, params);

    }, [request, router.query]);
    
    
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

    function handlePrice(e) {
        if (e.target.id == 'from' ) {

            if (URLParams['price']) {

                if(e.target.value.length == 0) {
                    let arr = URLParams['price'].split(',')
                
                    arr[0] = goodPrices?.prices_and_count?.min
                    e.target.value = goodPrices?.prices_and_count?.min
    
                    URLParams['price'] = arr.join(',')
                } else {

                    let arr = URLParams['price'].split(',')
                
                    arr[0] = e.target.value
    
                    URLParams['price'] = arr.join(',')
                }


            } else {
                URLParams['price'] = `${e.target.value}, ${goodPrices?.prices_and_count?.max}`
            }

        } else if (e.target.id == 'to' ) {

            if (URLParams['price']) {
                if(e.target.value.length == 0) {
                    let arr = URLParams['price'].split(',')
                
                    arr[1] = goodPrices?.prices_and_count?.max
                    e.target.value = goodPrices?.prices_and_count?.max
    
                    URLParams['price'] = arr.join(',')
                } else {
                    let arr = URLParams['price'].split(',')
                    
                    arr[1] = e.target.value

                    URLParams['price'] = arr.join(',')
                }
            } else {
                URLParams['price'] = `${goodPrices?.prices_and_count?.min}, ${e.target.value}`
            }
            
        }

        router.push({
            pathname: `/search/[request]/1`,
            query: URLParams
        })

    }

    function handleSelect(value) {

        setOrder(value.value)

        if (value.value == 'default') {
             delete URLParams[`order`]
        } else {
            URLParams[`order`] = value.value;
        }


        router.push({
            pathname: `/search/[request]/1`,
            query: URLParams
        })
    } 


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
        { value: 'asc', label: 'По возрастанию цены' },
        { value: 'desc', label: 'По уменьшению цены' }
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
                                <div>
                                    <label>От</label>
                                    <input id='from' onChange={handlePrice}  defaultValue={goodPrices?.prices_and_count?.min}></input>
                                </div>
                                <div>
                                    <label>До</label>
                                    <input id='to'  onChange={handlePrice} defaultValue={goodPrices?.prices_and_count?.max}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            <h1>Поиск по запросу: {request}</h1>
                            <div className={styles.toolbar}>
                                <h3>
                                    {data?.count} товаров
                                </h3>
                                
                                <div className={styles.sorter}>                                    
                                    <Select className={styles.select} value={order} options={options} placeholder='Сортировка' onChange={e => handleSelect(e)}></Select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            {
                                data?.rows?.map(item => (
                                    <div key={item.guid} className={styles.category_good}>
                                    
                                    <div>
                                        <Link href={`/product/${item.guid}`}>
                                            <a>
                                                <div className={styles.good_img}>
                                                <img alt="" src={`http://${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
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
                                                item.price != '' ? (<p><span>{Number(item.prices_and_count.price).toLocaleString()}</span> ₽ / шт.</p>) : <b>По запросу</b>
                                            }
                                        </div>
                                        {GetButton(item)}
                                        
                                    </div>
                                </div>
                                )
                            )
                            }
                            
                        </div>
                        <div className={styles.pagination}>
                            <ul>
                                {
                                    +page !== 1 ? (
                                        <Link href={`/search/${request}/${+page - 1}`}>
                                            <li className={styles.pagination_left}>
                                                {<svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0"
                                                    y="0"
                                                    enableBackground="new 0 0 512.002 512.002"
                                                    version="1.1"
                                                    viewBox="0 0 512.002 512.002"
                                                    xmlSpace="preserve"
                                                    >
                                                    <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
                                                </svg>}
                                            </li>
                                        </Link>
                                    ) : null
                                }
                                {paginationCount.map( pageNumber => {
                                    if (page == pageNumber) {
                                        return (
                                            <li style={{background: '#d00', color: "#fff"}}><p>{pageNumber}</p></li>
                                        )
                                    } else {
                                        return (
                                            <Link href={`/search/${request}/${pageNumber}`}>
                                                <li>{pageNumber}</li>
                                            </Link>
                                        )
                                    }
                                } )}
                                {
                                    (data?.count / 20) > page ? (
                                        <Link href={`/search/${request}/${+page + 1}`}>
                                            <li className={styles.pagination_right}>
                                                {<svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0"
                                                    y="0"
                                                    enableBackground="new 0 0 512.002 512.002"
                                                    version="1.1"
                                                    viewBox="0 0 512.002 512.002"
                                                    xmlSpace="preserve"
                                                    >
                                                    <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"></path>
                                                </svg>}
                                            </li>
                                        </Link>
                                    ) : null
                                }
                            </ul>
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
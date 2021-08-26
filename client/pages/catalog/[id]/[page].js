import Header from '../../../components/Header/Header';
import Mainstyles from '../../index.module.css';
import styles from './category.module.css'
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


const Category = observer(({mainTitle}) => {

    // Router
    const router = useRouter()
    let {id, page, sort, ...args} = router.query
    console.log(router.query)

    //UseState
    const [data, setData] = useState([]);
    const [countGoods, setCountGoods] = useState(0);
    const [attributes, setAttributes] = useState([]);
    const [filters, setFilters] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [prices, setPrices] = useState([]);
    const [priceFilter, setPriceFilters] = useState([]);
    const [isLoading, setLoading] = useState([true]);

   
    
    useEffect(() => {
        setLoading(true)
        async function getData(id, params){
            
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



            fetch(`http://localhost/api/products?group_id=${id}&limit=20${generate(parametrs)}`)
            .then(res => res.json())
            .then(json => {
                setData(json?.rows)
                setCountGoods(json?.count)
                
            })


            setLoading(false)
                
        }
        async function getDataAttr(id){
           
            fetch(`http://localhost/api/goods_attributes?group_id=${id}`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                let arr = []

                json.forEach(item => {
                    arr.push(item?.attribute?.title)
                })
                setAttributes(json)
                setFilters(Array.from(new Set(arr)))
            })

                
        }
        async function getCategoryData(id){


                
        }

        let params = {}
        Object.assign(params, router.query)
        delete params['id']
        delete params['page']

        getCategoryData(id);
        getData(id, params)
        getDataAttr(id)

    }, [router.query, page]);
    
    // function handleSelect(value) {
    //     if (value.value == 'default') {
    //          delete params[`sort`]
    //     } else {
    //         params[`sort`] = value.value;
    //     }
    //     let parametrs = Object.entries(params)
    //     function generate(parametrs) {
    //         let string =''
    //         parametrs.forEach((item, index) => {
    //             if(index == 0) {
    //                 string = `?${item[0]}=${item[1]}`
    //             } else {
    //                 string = string + `&${item[0]}=${item[1]}`
    //             }
    //         })
    //         return string
    //     }
    //     router.push(`/catalog/${id}/1${generate(parametrs)}`)
    // } 
    // function handleRange(values) {
    //     setPriceFilters(values)
    //     let result = dataF.filter(item => {
    //         if (item.price >= values[0] && item.price <= values[1]) {
    //             return true
    //         }
    //     }) 
    //     dataF = result;
    // }

    function handleFilter(e) {

        let filter_id = e?.target?.id;
        let value = e?.target?.value
        let attr_id = 'filter_' + attributes.filter(item => filter_id == item.id)[0].attr_id?.toString()

        console.log(attr_id, value)

        console.log(args);

        if (Object.keys(args).length === 0) {
            router.push({
                pathname: `/catalog/[id]/1`,
                query: {id: id, [attr_id]: value , ...args}
            })
        } else {
            for (let key in args) {

                if (key !== attr_id) {
                    router.push({
                        pathname: `/catalog/[id]/1`,
                        query: {id: id, [attr_id]: value , ...args}
                    })
                } else if (key === attr_id && args[key] !== value) {

                    let new_value = value + ',' + args[key];

                    router.push({
                        pathname: `/catalog/[id]/1`,
                        query: {id: id, [attr_id]: new_value , ...args}
                    })

                } else {

                    delete args[attr_id]

                    router.push({
                        pathname: `/catalog/[id]/1`,
                        query: {id: id , ...args}
                    })
                }
    
            }
        }


        
    }
    function showGoods() {
        return data.map(item => {
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
                                    item?.prices_and_count?.price != '' ? (<p><span>{Number( item.prices_and_count?.price).toLocaleString()}</span> ₽ / шт.</p>) : <b>По запросу</b>
                                }
                            </div>
                            <a id={item.guid} className={styles.to_cart} onClick={e => {addGood(e)}}>В корзину</a>
                            
                        </div>
                        
                </div>
                )
        })
    }
    useEffect(() => {
        showGoods()
    }, [data[0]])
    
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

    let paginationCount = [1]
    let count = +countGoods
    for (let i = count; i > 20; i = i - 20) {
        if (paginationCount.length == '0') {
            return;
        } else {
            paginationCount.push(`${+paginationCount.length + 1}`   )
        }
    }

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

                        {
                            filters.map(item => (                                   
                                <div key={item}>
                                    <div className={styles.filter_title}>{item}</div>
                                    {
                                        attributes.map(item => (
                                            <div className={styles.checkbox_filter} >
                                                <input id={item?.id} value={item.value} data-request={item?.attribute?.id}  type='checkbox' onChange={e => {handleFilter(e)}}></input>
                                                <label for={item?.id}>{item.value}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        



                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            <h1>{data[0] ? data[0]['group.title'] : null}</h1>
                            <div className={styles.toolbar}>
                                <div>
                                    {countGoods} товаров
                                </div>
                                
                                <div className={styles.sorter}>                                    
                                    <Select className={styles.select} options={options} placeholder='Сортировка' onChange={e => handleSelect(e)}></Select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            {showGoods()}
                            
                        </div>
                        <div className={styles.pagination}>
                            <ul>
                                {
                                    +page !== 1 ? (
                                        <Link href={`/catalog/${id}/${+page - 1}`}>
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
                                            <Link href={`/catalog/${id}/${pageNumber}`}>
                                                <li>{pageNumber}</li>
                                            </Link>
                                        )
                                    }
                                } )}
                                {
                                    (countGoods / 20) > page ? (
                                        <Link href={`/catalog/${id}/${+page + 1}`}>
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




export async function getServerSideProps({ params: { id } }) {
        

    return {
      props: {
      },
    }
  }

export default Category
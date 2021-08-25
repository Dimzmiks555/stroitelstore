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
    let {id, page , sort, pa__type_of_door, pa__depth_of_door} = router.query
    console.log(router.query)

    //UseState
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
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
        setLoading(true)
        async function getData(id){
            
            fetch(`http://localhost/api/products?group=${id}`)
            .then(res => res.json())
            .then(json => setData(json))


            setLoading(false)
                
        }
        async function getDataAttr(){
           

                
        }
        async function getCategoryData(id){


                
        }
        getCategoryData(id);
        getData(id)
        getDataAttr()

    }, [router.query]);
    
    useEffect(() => {
        if (data != undefined) {
            Object.assign(items, data)
        }
    },[data])
    function addGood(e) {
        BusketStore.AddPosition(e.target.id, 1)
    }
    function GetButton(pos) {
        
        let obj = BusketStore.order.products.filter(item => item?.data?.id == pos.id)
        if (pos.stock_status == 'outofstock') 
        {       
            return <a className={styles.outofstock}>Под заказ</a>
        } else if (obj[0]?.data?.id == pos.id) {
            return (
                <Link href={`/product/${pos.id}`}>
                    <a id={pos.id} className={styles.to_cart_added} >Добавлен</a>
                </Link>
                )
        } else {
            return (
                    <a id={pos.id} className={styles.to_cart} onClick={e => {addGood(e)}}>В корзину</a>
                )
        }
        
    }
    function handleSelect(value) {
        if (value.value == 'default') {
             delete params[`sort`]
        } else {
            params[`sort`] = value.value;
        }
        let parametrs = Object.entries(params)
        function generate(parametrs) {
            let string =''
            parametrs.forEach((item, index) => {
                if(index == 0) {
                    string = `?${item[0]}=${item[1]}`
                } else {
                    string = string + `&${item[0]}=${item[1]}`
                }
            })
            return string
        }
        router.push(`/catalog/${id}/1${generate(parametrs)}`)
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
    let params = {}
    Object.assign(params, router.query)
    delete params['id']
    delete params['page']

    function handleFilter(e, params) {
        if (params[`${e.target.dataset.request}`] != undefined && !params[`${e.target.dataset.request}`].includes(e.target.value)) {
            params[`${e.target.dataset.request}`] = params[`${e.target.dataset.request}`] + ',' + e.target.value;
        } else if (params[`${e.target.dataset.request}`]?.includes(e.target.value)) {
            let array = params[`${e.target.dataset.request}`].split(',')
            array = array.filter(i => {
                return i != e.target.value
            })
            if (array[0] == undefined) {
                delete params[`${e.target.dataset.request}`]
            } else if (array[0] != undefined) {
                params[`${e.target.dataset.request}`] = array.join('')
            } else {
                params[`${e.target.dataset.request}`] = array.join(',')
            }
        } else {
            params[`${e.target.dataset.request}`] = e.target.value;
        }
        
        let parametrs = Object.entries(params)
        function generate(parametrs) {
            let string =''
            parametrs.forEach((item, index) => {
                if(index == 0) {
                    string = `?${item[0]}=${item[1]}`
                } else {
                    string = string + `&${item[0]}=${item[1]}`
                }
            })
            return string
        }

        router.push(`/catalog/${id}/1${generate(parametrs)}`)
    }
    function showGoods() {
        console.log(categoryData)
        return data.map(item => {
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

    let paginationCount = [1]
    let count = +categoryData?.count
    console.log(count)
    for (let i = count; i > 20; i = i - 20) {
        console.log(i)
        if (paginationCount.length == '0') {
            return;
        } else {
            console.log(paginationCount)
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
                            // Межкомнатные двери
                            id == '211' ? (
                                <>
                                <div>
                                    <div className={styles.filter_title}>Тип двери</div>
                                    <div className={styles.checkbox_filter}>
                                        {pa__type_of_door?.includes('212') ? (
                                            <input id='_type_of_door_gluhaya' value="212" data-request="pa__type_of_door" checked type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        ) : (
                                            <input id='_type_of_door_gluhaya' value="212" data-request="pa__type_of_door" type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        )}
                                        <label for="_type_of_door_gluhaya">Глухая</label>
                                    </div>
                                    <div className={styles.checkbox_filter}>
                                        {pa__type_of_door?.includes('213') ? (
                                            <input id='_type_of_door_glassed' value="213" data-request="pa__type_of_door" checked type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        ) : (
                                            <input id='_type_of_door_glassed' value="213" data-request="pa__type_of_door" type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        )}
                                        <label for="_type_of_door_glassed">Остекленная</label>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.filter_title}>Ширина полотна</div>
                                    <div className={styles.checkbox_filter}>
                                        {pa__depth_of_door?.includes('214') ? (
                                            <input id='_depth_of_door_38' value="214" data-request="pa__depth_of_door" checked type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        ) : (
                                            <input id='_depth_of_door_38' value="214" data-request="pa__depth_of_door" type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        )}
                                        <label for="_depth_of_door_38">38 мм</label>
                                    </div>
                                    <div className={styles.checkbox_filter}>
                                    {pa__depth_of_door?.includes('215') ? (
                                            <input id='_depth_of_door_40' value="215" data-request="pa__depth_of_door" checked type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        ) : (
                                            <input id='_depth_of_door_40' value="215" data-request="pa__depth_of_door" type='checkbox' onChange={e => {handleFilter(e, params)}}></input>
                                        )}
                                        <label for="_depth_of_door_40">40 мм</label>
                                    </div>
                                    
                                </div>
                                <div>
                                    <div className={styles.filter_title}>Тип полотна</div>
                                    <div className={styles.checkbox_filter}>
                                        <input id='_type_of_door' type='checkbox'></input>
                                        <label for="_type_of_door">Финиш-пленка</label>
                                    </div>
                                    <div className={styles.checkbox_filter}>
                                        <input id='_type_of_door' type='checkbox'></input>
                                        <label for="_type_of_door">Скин экошпон</label>
                                    </div>
                                    
                                </div>
                                </>
                            ) : null
                        }



                    </div>
                    <div className={styles.category_goodsblock}>
                        <div className={styles.category_goodsblock_header}>
                            <h1>{data[0]?.categories[0].name}</h1>
                            <div className={styles.toolbar}>
                                <div>
                                    {categoryData?.count} товаров
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
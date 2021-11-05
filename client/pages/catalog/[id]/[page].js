import Header from '../../../components/Header/Header';
import Mainstyles from '../../index.module.css';
import styles from './category.module.css'
import Catalog from "../../../components/Catalog";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import HOST from '../../../HOST';
import Footer from '../../../components/Footer/Footer';
import BusketStore from '../../../components/Busket/BusketStore.js';
import Select from 'react-select'
import Modal from '../../../components/Modal/Modal.jsx'
import MobileMenu from '../../../components/MobileMenu/MobileMenu';
import 'rc-slider/assets/index.css';
import ModalStore from '../../../components/Modal/ModalStore';
import Loader from '../../../components/Loader/Loader';
import Image from 'next/image'


const Category = observer(({mainTitle}) => {

    // Router
    const router = useRouter()
    let {id, page, sort, price , ...args} = router.query
    console.log(router.query)

    //UseState
    const [data, setData] = useState([]);
    const [countGoods, setCountGoods] = useState(0);
    const [attributes, setAttributes] = useState([]);
    const [filters, setFilters] = useState([]);
    const [goodPrices, setGoodPrices] = useState([]);
    const [order, setOrder] = useState('');
    const [isLoading, setLoading] = useState([false]);
    const [group, setGroup] = useState('')
    const [showFilters, setShowFilters] = useState('none')
    const [scroll, setScroll] = useState('hidden')

    const [URLParams, setURLParams] = useState(router.query);

    
    
    useEffect(() => {
        setLoading(true)
        setURLParams(router.query)
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


                
            if (id == 'e4288d53-b14d-11eb-943b-18c04d2a3938') {
                fetch(`${HOST.host}/api/products?page=${page}&group_id=${id}&interdoor=true&limit=20${generate(parametrs)}`)
                .then(res => res.json())
                .then(json => {
                    setData(json?.rows)
                    setCountGoods(json?.count?.length)
    
                    let parent_id = json?.rows[0]?.group?.parent_group
    
                    fetch(`${HOST.host}/api/groups`)
                    .then(res => res.json())
                    .then(json => {
                        let group = json?.rows?.filter(item => item.guid == parent_id)[0]
                        setGroup(group)
                    })
    
    
                })
            } else {
                fetch(`${HOST.host}/api/products?page=${page}&group_id=${id}&limit=20${generate(parametrs)}`)
                .then(res => res.json())
                .then(json => {
                    setData(json?.rows)
                    setCountGoods(json?.count?.length)

                    let parent_id = json?.rows[0]?.group?.parent_group

                    fetch(`${HOST.host}/api/groups`)
                    .then(res => res.json())
                    .then(json => {
                        let group = json?.rows?.filter(item => item.guid == parent_id)[0]
                        setGroup(group)
                    })


                })
            }


            setLoading(false)
                
        }
        async function getDataAttrGoods(id){
           
            fetch(`${HOST.host}/api/goods_attributes?group_id=${id}&group=value`)
            .then(res => res.json())
            .then(json => {



                setAttributes(json)
            })

                
        }
        async function getGoodPrices(id, params){
           
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



            fetch(`${HOST.host}/api/products_prices?page=${page}&group_id=${id}&limit=20${generate(parametrs)}`)
            .then(res => res.json())
            .then(json => {
                setGoodPrices(json[0])
            })

            setLoading(false)

                
        }
        async function getDataAttr(id){
           
            fetch(`${HOST.host}/api/attributes?group_id=${id}`)
            .then(res => res.json())
            .then(json => {
                setFilters(json.rows)
            })

                
        }

        let params = {}
        Object.assign(params, router.query)
        delete params['id']
        delete params['page']

        getData(id, params)

        
        if (params['price']) {

            let arr = params['price'].split(',')

            setGoodPrices({
                prices_and_count: {
                    max: arr[1],
                    min: arr[0]
                }
            })
        } else {
            getGoodPrices(id, params)
        }

        getDataAttr(id)
        getDataAttrGoods(id)





    }, [router.query, page, order]);
    
    function handleSelect(value) {

        setOrder(value.value)

        if (value.value == 'default') {
             delete URLParams[`order`]
        } else {
            URLParams[`order`] = value.value;
        }


        router.push({
            pathname: `/catalog/[id]/1`,
            query: URLParams
        })
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
            pathname: `/catalog/[id]/1`,
            query: URLParams
        })

    }

    function handleFilter(e) {

        let filter_id = e?.target?.id;
        let value = e?.target?.value
        let attr_id = 'filter_' + attributes.filter(item => filter_id == item.id)[0].attr_id?.toString()

        if (URLParams[attr_id] == value && URLParams[attr_id] != undefined) {
            delete URLParams[attr_id]
        } else if (URLParams[attr_id]?.search(value) == -1 && URLParams[attr_id] != undefined) {

            let arr = URLParams[attr_id].split(';')

            arr.push(value)


            URLParams[attr_id] = arr.join(';')

        } else if (URLParams[attr_id]?.search(value) != -1 && URLParams[attr_id] != undefined) {

            let arr = URLParams[attr_id].split(';')

            let newArr = arr.filter(item => { return item !== value})

            console.log(newArr)

            URLParams[attr_id] = newArr.join(';')

        } else {
            URLParams[attr_id] = value
        }

        console.log(attr_id, value ,args, URLParams)

        router.push({
            pathname: `/catalog/[id]/1`,
            query: URLParams
        })

        
    }


    function addGood(e) {
        BusketStore.AddPosition(e.target.id, 1)
    }

    function handlePage(e, page) {

        URLParams['page'] = page

        router.push({
            pathname: `/catalog/[id]/${page}`,
            query: URLParams
        })

    }

    function handleStock(e) {
        
        if (e.target.id == 'instock') {
            URLParams['stock'] = 'instock'
        } else if (e.target.id == 'outstock') {
            URLParams['stock'] = 'outstock'
        } else {
            delete URLParams['stock']
        }

        router.push({
            pathname: `/catalog/[id]/${page}`,
            query: URLParams
        })

    }


    function handleOrder(e, guid) {
        ModalStore.setIsOpen(true)
        ModalStore.setGood(guid)
    }

    function handleShowFilter(e) {
        setShowFilters('block')
        setScroll('scroll')
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }

    function handleClose(e) {
        setShowFilters('none')
        setScroll('hidden')
        document.body.style.overflow = "scroll";
    }

    function showGoods() {
        return data.map(item => {
                return (
                    <div key={item.guid} className={styles.category_good}>
                        <div>
                            <Link href={encodeURI(`/product/${item.guid}`)}>
                                <a>
                                    <div className={styles.good_img}>
                                        <img alt="" src={`${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                    </div>
                                </a>
                            </Link>
                            <Link href={encodeURI(`/product/${item.guid}`)}>
                                <a>
                                    <div className={styles.good_title}>
                                        {item?.group_id == 'e4288d53-b14d-11eb-943b-18c04d2a3938' ? item.title?.slice(0, item.title?.search('ширина')) : item.title}
                                    </div>
                                </a>
                            </Link>
                        </div>
                        <div>
                            
                            <div className={styles.good_price}>
                                {
                                    item?.prices_and_count?.price != '' ? (<p><span>{Number( item.prices_and_count?.price).toLocaleString()}</span> ₽</p>) : <b>По запросу</b>
                                }
                            </div>
                            <div className={styles.good_amount}>
                                
                            {item?.prices_and_count?.amount > 0 ? <p style={{color: '#080'}}>{item?.prices_and_count?.amount}  в наличии </p > : <p style={{color: '#a00'}}>Нет в наличии</p>}

                            </div>
                                {
                                    BusketStore?.order?.products.filter(f => f.guid == item.guid).length > 0 ? 
                                    <a id={item.guid} className={styles.to_cart_added}>Добавлено</a> : 
                                    item?.prices_and_count?.amount > 0 ? 
                                    <a id={item.guid} className={styles.to_cart} onClick={e => {addGood(e)}}>В корзину</a> : 
                                    <a id={item.guid} className={styles.outofstock} onClick={e => {handleOrder(e, item.guid)}}>Под заказ</a>
                                }
                            
                        </div>
                        
                </div>
                )
        })
    }
    useEffect(() => {
        showGoods()
    }, [data[0]])
    
        let paginationCount = [1]
    let count = +countGoods
    for (let i = count; i > 20; i = i - 20) {
        if (paginationCount.length == '0') {
            return;
        } else {
            paginationCount.push(`${+paginationCount.length + 1}`   )
        }
    }
    paginationCount.length = 20

    const options = [
        { value: 'default', label: 'По умолчанию' },
        { value: 'asc', label: 'По возрастанию цены' },
        { value: 'desc', label: 'По уменьшению цены' }
    ]
    
    let tags = [];

    for (let key in URLParams) {
        
        if (key != 'page' && key != 'id' && key != 'order') {
            
            tags.push({
                title: key,
                value: URLParams[key]
            })


        }


    }


    return (
        <>
        <Head>
            <title>СТРОИТЕЛЬ - {group?.title}</title>
            <meta name="description" content="СТРОИТЕЛЬ - лучший интернет-магазин строительных материалов в городе Лиски! Всегда актуальные цены и остатки!"/>
            <meta name='keywords' content={`магазин, интернет-магазин, СТРОИТЕЛЬ, строительные материалы, Лиски, Воронежская область, строительный магазин, ${group?.title}  `}></meta>
        </Head>
        <Catalog />
        <Header />
        <div className={Mainstyles.page}>
            <div className={styles.category}>
                <div className={styles.category_main}>
                    <div className={styles.category_filter__mobile}  style={{display: showFilters, overflow: scroll}} >
                        <div className={styles.category_filter__mobile_header}>
                            <h2 className={styles.filter_title}>Фильтры</h2>
                            <span className={styles.close} onClick={handleClose}>&#215;</span>
                        </div>
                        <div className={styles.filter_stock}>
                            <form className={styles.filter_inputs}>
                                {!URLParams.stock ? <input id="default"  type='radio' name="default" onClick={handleStock} checked></input> : <input id="default"  type='radio' name="default" onClick={handleStock} ></input>}
                                <label for="default">В наличии и под заказ</label>
                                {URLParams.stock == 'instock' ? <input id="instock" type='radio' name="default" onClick={handleStock} checked></input> : <input id="instock" type='radio' name="default" onClick={handleStock}></input>}
                                <label for="instock">В наличии</label>
                                {URLParams.stock == 'outstock' ? <input id='outstock' type='radio' name="default" onClick={handleStock} checked></input> : <input id='outstock' type='radio' name="default" onClick={handleStock}></input>}
                                <label for="outstock">Под заказ</label>
                            </form>
                        </div>

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

                        {
                            filters.map(item => (                                   
                                <div key={item.id}>
                                    <div className={styles.filter_title}>{item.title}</div>
                                    {
                                        attributes.filter(subitem => {return subitem.attr_id == item.id }).map(item => (
                                            <div className={styles.checkbox_filter} >
                                                <input id={item?.id} value={item.value}  checked={router.query[`filter_${item?.attr_id}`] && router.query[`filter_${item?.attr_id}`].search(item?.value) != -1 ? true : false}     data-request={item?.attribute?.id}  type='checkbox' onChange={e => {handleFilter(e)}}></input>
                                                <label for={item?.id}>{item.value}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        

                        <button className={styles.mobile_filter__button_accept} onClick={handleClose}>
                            Применить ({countGoods})
                        </button>

                    </div>

                    <div className={styles.category_filter}>
                        <div className={styles.filter_stock}>
                            <form className={styles.filter_inputs}>
                                {!URLParams.stock ? <input id="default"  type='radio' name="default" onClick={handleStock} checked></input> : <input id="default"  type='radio' name="default" onClick={handleStock} ></input>}
                                <label for="default">В наличии и под заказ</label>
                                {URLParams.stock == 'instock' ? <input id="instock" type='radio' name="default" onClick={handleStock} checked></input> : <input id="instock" type='radio' name="default" onClick={handleStock}></input>}
                                <label for="instock">В наличии</label>
                                {URLParams.stock == 'outstock' ? <input id='outstock' type='radio' name="default" onClick={handleStock} checked></input> : <input id='outstock' type='radio' name="default" onClick={handleStock}></input>}
                                <label for="outstock">Под заказ</label>
                            </form>
                        </div>

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

                        {
                            filters.map(item => (                                   
                                <div key={item.id}>
                                    <div className={styles.filter_title}>{item.title}</div>
                                    {
                                        attributes.filter(subitem => {return subitem.attr_id == item.id }).map(item => (
                                            <div className={styles.checkbox_filter} >
                                                <input id={item?.id} value={item.value}  checked={router.query[`filter_${item?.attr_id}`] && router.query[`filter_${item?.attr_id}`].search(item?.value) != -1 ? true : false}     data-request={item?.attribute?.id}  type='checkbox' onChange={e => {handleFilter(e)}}></input>
                                                <label for={item?.id}>{item.value}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        


                    </div>
                    
                    <div className={styles.category_goodsblock}>
                    {data?.[0]?.group?.guid != router.query.id || isLoading  ? <Loader></Loader> :
                        <>
                        <div className={styles.category_goodsblock_header}>
                            <h1>{data[0] ? data[0]?.group?.title : null}</h1>
                            <div className={styles.breadcrumbs}><Link href='/categories'><a>Каталог</a></Link> / <Link href={`/categories/${group?.guid}`}><a>{group?.title}</a></Link></div>

                            <div className={styles.toolbar}>
                                <div>
                                    {countGoods} товаров
                                </div>
                                
                                <div className={styles.sorter}>                                    
                                    <Select className={styles.select} options={options} placeholder='Сортировка' onChange={e => handleSelect(e)}></Select>
                                </div>
                            </div>
                            <div className={styles.mobile_filter}>
                                <button onClick={handleShowFilter} className={styles.mobile_filter__button}>
                                    Фильтры
                                </button>
                            </div>
                        </div>
                        <div className={styles.category_goods}>
                            {showGoods()}       
                        </div>
                        <div className={styles.pagination}>
                            <ul>
                                {
                                    +page !== 1 ? (
                                        <li className={styles.pagination_left} onClick={e => handlePage(e, +page - 1)}>
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
                                    ) : null
                                }
                                {paginationCount.map( pageNumber => {
                                    if (page == pageNumber) {
                                        return (
                                            <li style={{background: '#d00', color: "#fff"}}><p>{pageNumber}</p></li>
                                        )
                                    } else {
                                        return (
                                                <li onClick={e => handlePage(e, pageNumber)}>{pageNumber}</li>
                                        )
                                    }
                                } )}
                                {
                                    (countGoods / 20) > page ? (
                                            <li className={styles.pagination_right} onClick={e => handlePage(e, +page + 1)}>
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
                                    ) : null
                                }
                            </ul>
                        </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    <Modal></Modal>
        <Footer />
    <MobileMenu></MobileMenu>
        </>
    )

}) 




export async function getServerSideProps({params}) {
        




    return {
      props: {

      },
    }
  }

export default Category
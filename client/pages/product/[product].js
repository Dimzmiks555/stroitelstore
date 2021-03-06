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
import Image from 'next/image';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import Footer from '../../components/Footer/Footer';
import BusketStore from '../../components/Busket/BusketStore';
import HOST from '../../HOST';
import RecentGoods from '../../components/RecentGoods/RecentGoods';
import Modal from '../../components/Modal/Modal.jsx';
import ModalStore from '../../components/Modal/ModalStore';
import Loader from '../../components/Loader/Loader';
const Product = observer(({data, group, parent_group}) => {
    
    const [added, setAdded] = useState(false);
    const router = useRouter(); 
    const [image, setImage] = useState('');
    const [counter_value, setCV] = useState([1]);
    const [isLoading, setLoading] = useState([true]);
    const [doorsWidth, setDoorsWidth] = useState([])
    const [doorsGlass, setDoorsGlass] = useState([])
    const [doorsColor, setDoorsColor] = useState([])
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
        if (data?.prices_and_count?.amount < counter_value + 1 ) {
            setCV(+counter_value)
        } else {
            setCV(+counter_value + 1)
        }
    }
    function decrement() {
        setAdded(false);
        if(+counter_value != 1) {
            setCV(+counter_value - 1)
        }
    }

    useEffect(() => {

        if (data.group_id == 'e4288d53-b14d-11eb-943b-18c04d2a3938') {
            fetch(`${HOST.host}/api/products?sku=${data.prices_and_count?.sku}&limit=20000`)
            .then(res => res.json())
            .then(json => {
                console.log(json)

                let values = []
                let glasses = []
                let colors = []

                json?.rows?.forEach(o => {
                    
                    if (o?.filter_1?.[0]?.attribute?.title == '????????????') {
                        let value = o?.filter_1?.[0]?.value

                        values.push(value)
                    }
                    if (o?.filter_1?.[1]?.attribute?.title == '?????????????? ????????????????????') {
                        
                        let glass = o?.filter_1?.[1]?.value
                        glasses.push(glass)
                    }
                    if (o?.filter_1?.[2]?.attribute?.title == '????????') {
                        
                        let color = o?.filter_1?.[2]?.value
                        colors.push(color)
                    }

                })

                setDoorsColor([...new Set(colors)])
                setDoorsWidth([...new Set(values)])
                setDoorsGlass([...new Set(glasses)])



            })
        }

    }, [data.guid])

   

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
    function handleOrder(e, guid) {
        ModalStore.setIsOpen(true)
        ModalStore.setGood(guid)
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
                    ???
                    </a>
                    {
                        data?.guid != router.query.product  ? (
                            <Loader></Loader>
                        ) : 
                        <div className={styles.product}>
                            {console.log(data)}
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
                                {data?.group_id == 'e4288d53-b14d-11eb-943b-18c04d2a3938' && (
                                    <>
                                    
                                    <div className={styles.color_pallete}>
                                        {
                                            ['????????????', '??????????', '?????????? ????????e???? ????????', '?????????? ?????????????? ??????', '????????', '????????', '?????????????? ??????', '?????????? ??????????', '?????????? ??????????????', '???????? ?????? ??????????'].map(color => (
                                                <div className={styles.color}>
                                                    <img src={`/color_pallete/${color}.jpg`}></img>
                                                    <div>{color}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    </>
                                )}
                            </div>
                            <div className={styles.product__overview_info} id="product__overview_info">
                            <div className={styles.breadcrumbs}><Link href='/categories'><a>??????????????</a></Link> / <Link href={`/categories/${parent_group?.guid}`}><a>{parent_group?.title}</a></Link> / <Link href={`/catalog/${group?.guid}/1`}><a>{group?.title}</a></Link> </div>
                                <div className={styles.product__overview_title}>
                                    <h1>{data.title}</h1>
                                    <h4>??????????????: {data?.prices_and_count?.sku}</h4>
                                </div>
                                {console.log(group)}
                                

                                <div className={styles.product__overview_price}>
                                    {data?.prices_and_count?.price ? (<p><span>{(+data?.prices_and_count?.price).toLocaleString()}</span> ??? / ????.</p>) : <p>???????? ???? ??????????????</p>} 
                                </div>
                                <div className={styles.product__to_cart__block}>
                                    <div className={styles.product__counter}>
                                        <button onClick={increment}>
                                            +
                                        </button>
                                        <input value={counter_value} onChange={e => {handleChange(e)}} type="number" min="1">
                                        </input>
                                        <button onClick={decrement}>
                                            ???
                                        </button>
                                    </div>
                                    {  
                                         data?.prices_and_count?.amount == 0 ? (
                                            <div className={styles.product__overview_cart}>
                                                <button id={data?.guid} style={{background: '#aaa'}} onClick={e => handleOrder(e, data?.guid)} >
                                                    ?????? ??????????
                                                </button>
                                            </div>
                                        ) :
                                        added === false ? (
                                            <div className={styles.product__overview_cart}>
                                                <button id={data?.guid} onClick={e => {handleClick(e)}}>
                                                    ?? ??????????????
                                                </button>
                                            </div>
                                        ) :  (
                                            <div className={styles.product__overview_cart_added} disabled>
                                                <button id={data?.guid} onClick={e => {handleClick(e)}}>
                                                    ??????????????????
                                                </button>
                                            </div>
                                        )
                                    } 
                                    {
                                    data?.group_id != 'e4288d53-b14d-11eb-943b-18c04d2a3938' && (
                                        <div className={styles.amount}>
                                            
                                            {data?.prices_and_count?.amount > 0 ? <p style={{color: '#080'}}>{data?.prices_and_count?.amount}  ?? ?????????????? </p > : <p style={{color: '#a00'}}>?????? ?? ??????????????</p>}

                                        </div>
                                    )
                                    }
                                   
                                </div> 
                                {data?.group_id == 'e4288d53-b14d-11eb-943b-18c04d2a3938' && (
                                    <>
                                    
                                    <h3>????????????</h3>
                                    <div className={styles.tabs_width}>
                                        {
                                            doorsWidth?.map(width => (
                                                <Link href={encodeURI(`/product/${data?.prices_and_count?.sku}-${data.filter_1.filter(i => {return i.attribute.title == '????????'})?.[0]?.value}-${data.filter_1.filter(i => {return i.attribute.title == '?????????????? ????????????????????'})?.[0]?.value}-${width}`)}>
                                                    <div style={data.filter_1.filter(i => {return i.attribute.title == '????????????'})?.[0]?.value == width ? {border: '1px solid red'} : null} className={styles.tab_width}>{width} ????</div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                    <h3>????????</h3>
                                    <div className={styles.tabs_width}>
                                        {
                                            doorsColor?.map(color => (
                                                <Link href={encodeURI(`/product/${data?.prices_and_count?.sku}-${color}-${data.filter_1.filter(i => {return i.attribute.title == '?????????????? ????????????????????'})?.[0]?.value}-${data.filter_1.filter(i => {return i.attribute.title == '????????????'})?.[0]?.value}`)}>
                                                    <div style={data.filter_1.filter(i => {return i.attribute.title == '????????'})?.[0]?.value == color ? {border: '1px solid red'} : null} className={styles.tab_width}>{color}</div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                    <h3>?????????????? ????????????????????</h3>
                                    <div className={styles.tabs_width}>
                                        {
                                            doorsGlass?.map(glass => (
                                                <Link href={encodeURI(`/product/${data?.prices_and_count?.sku}-${data.filter_1.filter(i => {return i.attribute.title == '????????'})?.[0]?.value}-${glass}-${data.filter_1.filter(i => {return i.attribute.title == '????????????'})?.[0]?.value}`)}>
                                                    <div style={data.filter_1.filter(i => {return i.attribute.title == '?????????????? ????????????????????'})?.[0]?.value == glass ? {border: '1px solid red'} : null} className={styles.tab_width}>{glass}</div>
                                                </Link>
                                            ))
                                        }
                                        {/* <div className={styles.tab_width}>600????</div>
                                        <div className={styles.tab_width}>700????</div>
                                        <div className={styles.tab_width}>800????</div>
                                        <div className={styles.tab_width}>900????</div> */}
                                    </div>
                                    </>
                                )}
                                <div className={styles.product__infoblock}>
                                    <div className={styles.product__description}>
                                        <h2>
                                            ????????????????????????????
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
                                                )) : '???????????????????????????? ??????????????????????'
                                            }
                                        </div>

                                        <h2>
                                            ????????????????
                                        </h2>
                                        <div>{data?.desc?.text ? data?.desc?.text : '???????????????? ??????????????????????.'}</div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    }
                    
                    <RecentGoods/>
                </div>
            )
        }
    }

    return (
        <>
        <Head>
            <title>?????????????????? - {data?.title} | ????????????????-?????????????? ???????????????????????? ???????????????????? ?? ???????????? ??????????</title>
            <meta name="description" content="?????????????????? - ???????????? ????????????????-?????????????? ???????????????????????? ???????????????????? ?? ???????????? ??????????! ???????????? ???????????????????? ???????? ?? ??????????????!"/>
            <meta name='keywords' content={`??????????????, ????????????????-??????????????, ??????????????????, ???????????????????????? ??????????????????, ??????????, ?????????????????????? ??????????????, ???????????????????????? ??????????????, ${data?.title}  `}></meta>
        </Head>
        <Catalog />
        <Header />
            {renderThis()}

        <Footer />
        <Modal></Modal>
    <MobileMenu></MobileMenu>
        </>
    )
}) 

export default Product  



export async function getServerSideProps({params}) {

    const result = await fetch(encodeURI(`${HOST.host}/api/products/${params?.product}`));
    let json = await result.json();

    let data = json[0]

    let group = json[0]?.group

    let parent_id = json[0]?.group?.parent_group


    const groups = await fetch(`${HOST.host}/api/groups`);
    
    const grjson = await groups.json();
    let parent_group = grjson?.rows?.filter(item => item.guid == parent_id)?.[0]
    console.log(grjson)


    return {
        props: {
            data, 
            group, 
            parent_group
        }
    }

    
}
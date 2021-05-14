import styles from './Busket.module.css'
import Link from 'next/link'
import BusketStore from './BusketStore'
import { useState, useEffect } from 'react'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { observer } from 'mobx-react';


const Busket = observer(() => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState([true]);
    let arr = []
    let count = []
    BusketStore.positions.map((item) => {
        arr.push(item.id)
    })
    BusketStore.counts.map((item) => {
        count.push(item.count)
    })
    useEffect(() => {
        async function getData(idArray){
            setLoading(true)
            const api = new WooCommerceRestApi({
                url: "http://admin.stroitelstore.ru/",
                consumerKey: "ck_f3179856b9f88fc14315e11fd4c231397f53759e",
                consumerSecret: "cs_51824080e7aea0de3cec00f7f409f4d1a67e881d",
                version: "wc/v3"
                });
            await api.get(`products`, {
                include: idArray
            })
                .then( result => {
                    console.log(result.data)
                        let data = []
                        result.data.map((item) => {
                            data.push(item)
                        })
                        setData(data)
                        setLoading(false)
                    }
                )
            
        }
        
        getData(arr);
           

    }, [ BusketStore.positions,  BusketStore.positions ]);

    return (
        <div className={styles.busket}>
            <div className={styles.busket_info}>
                <h1>Заказ</h1>
                <div className={styles.busket_items}>
                    {data.map((item, index) => (
                        <div className={styles.busket_item}>
                            <Link href={`/product/${item?.id}`}>
                                <a className={styles.good_img}>
                                    <div>
                                        <img src={item?.images[0]?.src}></img>
                                    </div>
                                </a>
                            </Link>
                            <Link href={`/product/${item?.id}`}>
                                <a className={styles.good_title}>
                                    {item?.name}
                                </a>
                            </Link>
                            <div className={styles.good_price}>
                                {count[index + 1]} шт
                            </div>
                            <div className={styles.good_price}>
                                {item?.price} ₽
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className={styles.busket_mainblock}>
                <div>
                    <h2>Итого</h2>
                </div>
            </div>
        </div>
    )
}) 
export default Busket
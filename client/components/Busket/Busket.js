import styles from './Busket.module.css'
import Link from 'next/link'
import BusketStore from './BusketStore'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react';


const Busket = observer(() => {

    let total = null

    BusketStore.positions.map((item, index) => {
        total += item.data?.price * item.count
    })

    function increment(e) {
        console.log(e.target.id)
        BusketStore.incrementCount(e.target.id)
    }
    function decrement(e) {
        BusketStore.decrementCount(e.target.id)
    }
    function handleChange(e) {
        BusketStore.setCount(e.target.id ,e.target.value)
    }
    function handleDelete(e) {
        BusketStore.delete(e.target.id)
    }
    return (
        <div className={styles.busket}>
            <div className={styles.busket_info}>
                <h1>Заказ</h1>
                <div className={styles.busket_items}>
                    {BusketStore.positions.map((item, index) => (
                        <div key={item.data.id} className={styles.busket_item}>
                            <Link href={`/product/${item?.data.id}`}>
                                <a className={styles.good_img}>
                                    <div>
                                        <img src={item?.data.images[0]?.src}></img>
                                    </div>
                                </a>
                            </Link>
                            <Link href={`/product/${item?.data.id}`}>
                                <a className={styles.good_title}>
                                    {item?.data.name}
                                </a>
                            </Link>
                            <div className={styles.good_price}>
                                {item?.data.price} ₽
                            </div>
                            <div className={styles.good__counter}>
                                <button id={index} onClick={increment}>
                                    +
                                </button>
                                <input id={index} value={item.count} onChange={handleChange} type="number">
                                </input>
                                <button id={index} onClick={decrement}>
                                    −
                                </button>
                            </div>
                            <div className={styles.good_total}>
                                 {item?.data.price * item.count} ₽
                            </div>
                            <div className={styles.delete__good}>
                                 <button id={index} onClick={handleDelete}>✖</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className={styles.busket_mainblock}>
                <div>
                    <h2>Итого <span>{total} ₽</span></h2>
                </div>
            </div>
        </div>
    )
}) 
export default Busket
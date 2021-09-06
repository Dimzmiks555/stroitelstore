import styles from './Busket.module.css'
import Link from 'next/link'
import BusketStore from './BusketStore'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react';
import HeaderStore from '../Header/HeaderStore';
import HOST from '../../HOST';

const Busket = observer(() => {

    


    const [delivery, setDelivery] = useState([])
    const [payment, setPayment] = useState([])
    const [data, setData] = useState([])
    const [total, setTotal] = useState(null)

    
    

    useEffect(() => {

        let IDs = [];

        BusketStore?.positions.forEach(item => {
            IDs.push(item.guid)
        })

        console.log(IDs)

        if (IDs[0]) {
            fetch(`${HOST.host}/api/products?limit=20&guid=${IDs.join(',')}`)
            .then(res => res.json())
            .then(json => {
                setData(json?.rows)

                let total = null

                json?.rows?.map((item, index) => {
                    total += +item?.prices_and_count?.price * +BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count
                    console.log(total)
                })

                setTotal(total)

            })
        }

    }, [BusketStore?.positions])




    if (HeaderStore.userData[0]?.email) {
        handleClientData('name', HeaderStore.userData[0]?.first_name);
        handleClientData('surname', HeaderStore.userData[0]?.last_name);
        handleClientData('phone', HeaderStore.userData[0]?.phone);
        handleClientData('mail', HeaderStore.userData[0]?.email);
        handleClientData('customer_id', HeaderStore.userData[0]?.id);
    }


    if (typeof window !== "undefined") {
        window.addEventListener('scroll', () => {
            if (document.getElementById('totalBlock') !== null) {
                let totalBlock = document.getElementById('totalBlock')
                let y = window.pageYOffset;
                    if (y >= 180 && y <= 720) {
                        totalBlock.style.position = 'fixed';
                        totalBlock.style.top = '0';
                        totalBlock.style.right = '10%';
                        totalBlock.style.width = '24%'
                    } else if (y > 720){
                        totalBlock.style.position = 'fixed';
                        totalBlock.style.bottom = '340px';
                        totalBlock.style.right = '10%';
                        totalBlock.style.width = '24%'
                    }
                    else {
                        totalBlock.style = null;
                    }
            }
            
        })
    } 
    function increment(e) {
        BusketStore.incrementCount(e.target.id)
        let IDs = [];

        BusketStore?.positions.forEach(item => {
            IDs.push(item.guid)
        })

        console.log(IDs)

        if (IDs[0]) {
            fetch(`${HOST.host}/api/products?limit=20&guid=${IDs.join(',')}`)
            .then(res => res.json())
            .then(json => {
                setData(json?.rows)

                let total = null

                json?.rows?.map((item, index) => {
                    total += +item?.prices_and_count?.price * +BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count
                    console.log(total)
                })

                setTotal(total)

            })
        }
    }
    function decrement(e) {
        BusketStore.decrementCount(e.target.id)
        let IDs = [];

        BusketStore?.positions.forEach(item => {
            IDs.push(item.guid)
        })

        console.log(IDs)

        if (IDs[0]) {
            fetch(`${HOST.host}/api/products?limit=20&guid=${IDs.join(',')}`)
            .then(res => res.json())
            .then(json => {
                setData(json?.rows)

                let total = null

                json?.rows?.map((item, index) => {
                    total += +item?.prices_and_count?.price * +BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count
                    console.log(total)
                })

                setTotal(total)

            })
        }
    }
    function handleChange(e) {
        BusketStore.setCount(e.target.id ,e.target.value)
        
        let IDs = [];

        BusketStore?.positions.forEach(item => {
            IDs.push(item.guid)
        })

        console.log(IDs)

        if (IDs[0]) {
            fetch(`${HOST.host}/api/products?limit=20&guid=${IDs.join(',')}`)
            .then(res => res.json())
            .then(json => {
                setData(json?.rows)

                let total = null

                json?.rows?.map((item, index) => {
                    total += +item?.prices_and_count?.price * +BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count
                    console.log(total)
                })

                setTotal(total)

            })
        }
    }
    function handleDelete(e) {
        BusketStore.delete(e.target.id, e.target.value)
        
    }
    function handleRadio(e) {
        setDelivery(e.currentTarget.id)
        BusketStore.setDelivery(e.currentTarget.id)
    }
    function handlePayment(e) {
        setPayment(e.currentTarget.id)
        BusketStore.setPayment(e.currentTarget.id)
    }
    function sendOrder(e) {
        BusketStore.setOrder()
    }
    function handleClientData(id, value) {
        console.log(id, value)
        BusketStore.setClientData(id, value)
    }
    function handleCreateDelivery(id, value) {
        BusketStore.createDelivery(id,value)
    }
    function addDelivery() {
        BusketStore.addDelivery()
    }
    return (
        <>
        <div className={styles.busket}>
            <div className={styles.busket_info}>
                <h1>Корзина</h1>
                {BusketStore.positions[0] ? (
                <>
                    <div className={styles.busket_items}>
                    {BusketStore?.order?.products?.length != 0 ? data?.map((item, index) => (
                        <div key={item.guid} className={styles.busket_item}>
                            <Link href={`/product/${item.guid}`}>
                                <a className={styles.good_img}>
                                    <div>
                                    <img alt="" src={`${HOST.host}/uploads/${item?.images?.length > 0 ? item?.images.filter(item => item.main == true)[0]?.url : 'empty.jpeg'}`}></img>
                                    </div>
                                </a>
                            </Link>
                            <Link href={`/product/${item?.guid}`}>
                                <a className={styles.good_title}>
                                    {item?.title}
                                </a>
                            </Link>
                            <div className={styles.good__counter}>
                                <button id={item.guid} onClick={increment}>
                                    +
                                </button>
                                <input id={item.guid} value={BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count} onChange={handleChange} type="number">
                                </input>
                                <button id={item.guid} onClick={decrement}>
                                    −
                                </button>
                            </div>
                            <div className={styles.good_total}>
                                 <b>{(item?.prices_and_count.price * BusketStore?.positions?.filter(subitem => subitem.guid == item.guid)[0]?.count).toLocaleString()}</b> ₽
                            </div>
                            <div className={styles.delete__good}>
                                 <button id={index} value={item?.guid} onClick={handleDelete}>✖</button>
                            </div>
                        </div>
                    )) : 'Пусто'}
                    
                </div>
                
                <div className={styles.dilivery}>
                    <h1>Способ доставки</h1>
                    <div className={styles.select}>

                            <input id="shop" type="radio" name="delivery"  ></input>
                            <label for="shop" className={styles.select__item} id="shop" onClick={handleRadio}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 512 512"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                >
                                <path d="M511.25 169.527l-.344-1.922c-.062-.297-.094-.594-.156-.883l-35.906-86.719V37.34H36.562v42.664L1.25 166.715c-.078.344-.125.688-.188 1.023l-.328 1.789A61.742 61.742 0 000 179.051c0 23.188 12.938 43.344 32 53.648V474.66h448V232.699c19.047-10.305 32-30.461 32-53.648 0-3.242-.266-6.422-.75-9.524zm-24.109-4.187h-78.375l-9.422-63.336h62l25.797 63.336zM57.906 58.668h395.609v21.336H57.906V58.668zm332.469 128l1.156 7.742-6.312 8.398c-7.562 10.078-19.125 15.859-31.703 15.859s-24.141-5.781-31.703-15.859l-6.438-8.578-.375-7.562h75.375zm-76.422-21.328l-3.109-63.336h66.922l9.438 63.336h-73.251zm-20.312 21.327l.375 7.735-6.328 8.406c-7.562 10.078-19.125 15.859-31.688 15.859-12.594 0-24.141-5.781-31.719-15.859l-6.469-8.633.375-7.508h75.454zm-74.375-21.327l3.203-63.336H289.5l3.094 63.336h-73.328zm-94.36 0l9.312-63.336h66.906l-3.219 63.336h-72.999zm71.906 21.328l-.391 7.82-6.25 8.32c-7.578 10.078-19.125 15.859-31.703 15.859s-24.125-5.781-31.703-15.859l-6.156-8.195 1.172-7.945h75.031zM50.641 102.004h62.016l-9.312 63.336h-78.5l25.796-63.336zm-28.579 84.664h78.156l-1.672 8.289-5.891 7.852c-7.578 10.078-19.125 15.859-31.719 15.859-19.233 0-35.311-13.781-38.874-32zM416 453.348h-85.344V378.66h10.672c5.891 0 10.672-4.766 10.672-10.656s-4.781-10.656-10.672-10.656h-10.672V282.66H416v170.688zm42.658 0h-21.33v-192h-128v192h-256v-213.82c2.484.312 5.047.477 7.609.477 19.938 0 37.656-9.578 48.766-24.383 11.125 14.805 28.828 24.383 48.766 24.383s37.641-9.578 48.766-24.383c11.109 14.805 28.828 24.383 48.766 24.383s37.625-9.578 48.75-24.383c11.125 14.805 28.828 24.383 48.766 24.383s37.641-9.578 48.766-24.383c11.125 14.805 28.812 24.383 48.75 24.383a61.19 61.19 0 007.625-.477v213.82zm-7.627-234.68c-12.562 0-24.125-5.781-31.688-15.859l-6.203-8.234-1.203-7.906h77.969c-3.562 18.218-19.625 31.999-38.875 31.999z"></path>
                                <path d="M74.656 261.348V410.66H288V261.348H74.656zm192 128H96V282.66h170.656v106.688z"></path>
                                <path d="M245.25 336.004a10.59 10.59 0 00-7.547 3.125l-21.328 21.344a10.575 10.575 0 00-3.125 7.531c0 5.891 4.781 10.656 10.656 10.656a10.59 10.59 0 007.547-3.125l21.328-21.312a10.648 10.648 0 003.125-7.562c0-5.876-4.765-10.657-10.656-10.657zM245.25 293.348a10.59 10.59 0 00-7.547 3.125l-64 63.984a10.678 10.678 0 00-3.125 7.547c0 5.891 4.781 10.656 10.672 10.656 2.938 0 5.609-1.188 7.531-3.125l64-63.984a10.611 10.611 0 003.125-7.547 10.649 10.649 0 00-10.656-10.656z"></path>
                                </svg>
                                <p>Самовывоз</p>
                            </label>
                            
                            <input id="deliv" type="radio" name="delivery" ></input>
                            <label for="deliv" className={styles.select__item} id="delivery" onClick={handleRadio}>
                                <p>Доставка</p>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 512 512"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                >
                                <path d="M119.467 337.067c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2s51.2-22.963 51.2-51.2c0-28.237-22.964-51.2-51.2-51.2zm0 85.333c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133s34.133 15.309 34.133 34.133c0 18.824-15.309 34.133-34.133 34.133zM409.6 337.067c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2 28.237 0 51.2-22.963 51.2-51.2 0-28.237-22.963-51.2-51.2-51.2zm0 85.333c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133 18.825 0 34.133 15.309 34.133 34.133 0 18.824-15.308 34.133-34.133 34.133z"></path>
                                <path d="M510.643 289.784l-76.8-119.467a8.535 8.535 0 00-7.177-3.917H332.8a8.53 8.53 0 00-8.533 8.533v213.333a8.525 8.525 0 008.533 8.533h34.133v-17.067h-25.6V183.467h80.674l72.926 113.442v82.825h-42.667V396.8h51.2a8.525 8.525 0 008.533-8.533V294.4a8.51 8.51 0 00-1.356-4.616z"></path>
                                <path d="M375.467 277.333V217.6h68.267v-17.067h-76.8a8.53 8.53 0 00-8.533 8.533v76.8a8.525 8.525 0 008.533 8.533h128v-17.067H375.467zM332.8 106.667H8.533A8.536 8.536 0 000 115.2v273.067a8.53 8.53 0 008.533 8.533H76.8v-17.067H17.067v-256h307.2v256H162.133V396.8H332.8a8.525 8.525 0 008.533-8.533V115.2a8.53 8.53 0 00-8.533-8.533z"></path>
                                <path d="M8.533 345.6H59.733000000000004V362.66700000000003H8.533z"></path>
                                <path d="M179.2 345.6H324.267V362.66700000000003H179.2z"></path>
                                <path d="M469.333 345.6H503.466V362.66700000000003H469.333z"></path>
                                <path d="M34.133 140.8H332.79999999999995V157.86700000000002H34.133z"></path>
                                <path d="M110.933 379.733H128V396.8H110.933z"></path>
                                <path d="M401.067 379.733H418.134V396.8H401.067z"></path>
                                <path d="M34.133 72.533H153.6V89.6H34.133z"></path>
                                <path d="M0 72.533H17.067V89.6H0z"></path>
                                </svg>
                            </label>

                    </div>
                    <div className={styles.select__overview}>
                        <div className="shop_block" style={{display: delivery == 'shop' ? 'block' : 'none'}}>
                            <h2><b>Ваш заказ вы сможете забрать по адресу:</b></h2>
                            <p><b>Воронежская область</b>, город <b>Лиски</b>, улица <b>Коммунистическая</b>, дом <b>25</b></p>
                        </div>
                        <div className="delivery_block" style={{display: delivery == 'delivery' ? 'block' : 'none'}}>
                            <h1>Адрес</h1>
                            {HeaderStore.userData[0]?.shipping?.city?.length < 1 && HeaderStore.userData[0]?.email ? (
                                <div className={styles.delivery__inputs}>
                                    <label for="city">Город</label>
                                    <input id="city" placeholder="Город" onChange={e => handleCreateDelivery(e.target.id, e.target.value)}></input>
                                    <label for="street">Улица</label>
                                    <input id="street" placeholder="Улица" onChange={e => handleCreateDelivery(e.target.id, e.target.value)}></input>
                                    <label for="house">Дом</label>
                                    <input id="house" placeholder="Номер дома" onChange={e => handleCreateDelivery(e.target.id, e.target.value)}></input>
                                    <label for="room">Квартира</label>
                                    <input id="room" placeholder="Номер квартиры" onChange={e => handleCreateDelivery(e.target.id, e.target.value)}></input>
                                    <button className={styles.newDelivery__button} onClick={addDelivery}>Сохранить</button>
                                </div>
                            ) : HeaderStore.userData[0]?.shipping?.address_1?.length > 1  && HeaderStore.userData[0]?.email ? (
                                <div className={styles.delivery__inputs}>
                                    <p>Город <b>{HeaderStore.userData[0]?.shipping?.city}</b>, {HeaderStore.userData[0]?.shipping?.address_1}</p>
                                </div>
                            ) : (
                                <div className={styles.delivery__inputs}>
                                    <label for="city">Город</label>
                                    <input id="city" placeholder="Город" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                                    <label for="street">Улица</label>
                                    <input id="street" placeholder="Улица" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                                    <label for="house">Дом</label>
                                    <input id="house" placeholder="Номер дома" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                                    <label for="room">Квартира</label>
                                    <input id="room" placeholder="Номер квартиры" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.payment_and_clientdata}>
                    <div className={styles.payment}>
                        <h1>Способ оплаты</h1>
                        <div className={styles.payment__methods}>
                            <input id="nal" type="radio" name="payment" onClick={e => {handlePayment(e)}} ></input>
                            <label className={styles.method} for="nal" >
                                Наличными или картой при получении
                            </label>
                            {/* <input id="card" type="radio" name="payment" onClick={e => {handlePayment(e)}}></input>
                            <label className={styles.method} for="card">
                                Банковской картой онлайн
                            </label> */}
                        </div>
                    </div>
                    {HeaderStore.is_Auth ? (
                        <div className={styles.clientdata}>
                            <div className={styles.clientdata__title}>
                                <h1>Ваши данные</h1>
                            </div>
                            <div className={styles.clientdata__inputs}>
                                <h3>{HeaderStore.userData.name} {HeaderStore.userData.surname}</h3>
                            </div>
                            <div>
                                <h3>{HeaderStore.userData.email}</h3>
                            </div>
                            <div>
                                <h3>{HeaderStore.userData.phone}</h3>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.clientdata}>
                            <div className={styles.clientdata__title}>
                                <h1>Ваши данные</h1>
                                <Link href="login">
                                    <button>Войти</button>
                                </Link>
                            </div>
                            <div className={styles.clientdata__inputs}>
                                <input id="name" placeholder="Имя" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                                <input id="surname" placeholder="Фамилия" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                            </div>
                            <div>
                                <input id="phone" placeholder="Номер телефона" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                            </div>
                            <div>
                                <input id="mail" placeholder="Электронная почта (не обязательно)" onChange={e => handleClientData(e.target.id, e.target.value)}></input>
                            </div>
                        </div>
                    )}
                </div>
                </>) : (<h2>В корзине пока ничего нет</h2>)}
                
            </div>
            {BusketStore.positions[0] ? (
            <div className={styles.busket_mainblock} id='totalBlock'>
                <div>
                    <h2>Итого <span>{total?.toLocaleString()} <i>₽</i></span></h2>
                    <h3>Всего позиций <span>{BusketStore.positions.length}</span></h3>
                    <h3>Способ доставки <span>{delivery == 'delivery' ? 'Доставка' : delivery == 'shop' ? 'Самовывоз' : 'Не выбран'}</span></h3>
                    {
                        HeaderStore.userData[0]?.email ? (
                            <h3>Адрес 
                                <span>
                                    {delivery == 'delivery' ?
                                    `г. ${HeaderStore.userData[0]?.shipping.city}, ${HeaderStore.userData[0]?.shipping.address_1}` 
                                    : delivery == 'shop' ? ' г. Лиски, ул. Коммунистическая, д. 25' : 'Не указан'}
                                </span>
                            </h3>
                        ) : (
                            <h3>Адрес 
                                <span>
                                    {delivery == 'delivery' ?
                                    `г. ${BusketStore.order.address.city}, ул. ${BusketStore.order.address.street}, д. ${BusketStore.order.address.house}, кв. ${BusketStore.order.address.room}` 
                                    : delivery == 'shop' ? ' г. Лиски, ул. Коммунистическая, д. 25' : 'Не указан'}
                                </span>
                            </h3>
                        )
                    }
                    <h3>Способ оплаты <span>{payment == 'nal' ? 'Наличными' : payment == 'card' ? 'Картой' : 'Не указан'}</span></h3>
                </div>
                {
                    HeaderStore.userData?.email ? (
                        <div>
                            { delivery != '' &&
                            payment!= '' ?
                                <button className={styles.to_pay} onClick={sendOrder}>Заказать</button> :
                                <button className={styles.to_pay} style={{background: '#ccc', cursor: 'default'}}>Заказать</button>}
                        </div>
                    ) : (
                        <div>
                            { delivery != '' &&
                            payment!= '' &&
                            BusketStore.order.clientData.phone != ''  &&
                            BusketStore.order.clientData.name != ''  &&
                            BusketStore.order.clientData.surname != '' ?
                                <button className={styles.to_pay} onClick={sendOrder}>Заказать</button> :
                                <button className={styles.to_pay} style={{background: '#ccc', cursor: 'default'}}>Заказать</button>}
                        </div>
                    )
                }
            </div>) : null}
        </div>
        </>
    )
}) 
export default Busket
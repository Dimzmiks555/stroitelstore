import { useState } from 'react'
import styles from '../pages/cabinet/orders.module.sass'


export default function OrdersItem({data}) {

    const [show, setShow] = useState('none')

    function handleShow(e) {


        if (show == 'none') {
            setShow('show');
            e.currentTarget.style.transform = 'rotate(180deg)'
        } else {
            setShow('none')
            e.currentTarget.style.transform = 'rotate(0deg)'
        }

    }

    return (
        <div className={styles.order}>
            <div className={styles.header}>
                <div>
                    <div className={styles.order_info}>
                        <p>Заказ № {data?.id} от {new Date(data?.createdAt).toLocaleDateString()} <i>{new Date(data?.createdAt).toLocaleTimeString()}</i></p>
                        <div className={styles.status_info}>
                        {
                            data?.status == 'waiting_for_payment' ? (<span className={styles.work}>Ожидает оплаты</span>) :
                            data?.status == 'waiting' ? (<span className={styles.waiting}>На рассмотрении</span>) :
                            data?.status == 'work' ? (<span className={styles.work}>В работе</span>) :
                            data?.status == 'cancel' ? (<span className={styles.cancel}>Отменен</span>) :
                            data?.status == 'complete' ? (<span className={styles.completed}>Завершен</span>) :
                            data?.status == 'ready' ? (<span className={styles.ready}>Готов к выдаче</span>) :
                            null
                        } {
                            data?.payments?.[0]?.paid == true ? (<span className={styles.completed}>Оплачено</span>) :
                            data?.payments?.[0]?.paid == false ? (<span className={styles.waiting}>Ожидает оплаты</span>) :
                            null
                        }
                        </div>
                    </div>
                    <div className={styles.delivery_address}>
                        {data?.type == 'shop' ? 'Самовывоз' : 'Доставка'} по адресу {data?.address}
                    </div>
                </div>
                <div>
                    <div className={styles.total}>
                        <p>{data?.total} ₽</p>
                    </div>
                    <div className={styles.payment_method}>
                        {data?.payment == 'nal' ? 'Наличными или картой при получении' : 'Банковская карта'}
                    </div>
                </div>
                <div>
                    <div className={styles.more} onClick={handleShow}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    enableBackground="new 0 0 128 128"
                    version="1.1"
                    viewBox="0 0 128 128"
                    xmlSpace="preserve"
                    >
                    <g
                        fill="none"
                        stroke="#2F3435"
                        strokeLinecap="square"
                        strokeMiterlimit="10"
                        strokeWidth="12"
                    >
                        <path d="M111 40.5L64 87.499"></path>
                        <path d="M64 87.499L17 40.5"></path>
                    </g>
                    </svg>
                    </div>
                </div>
            </div>
            {
                show != 'none' && (
                    <div className={styles.additional}>
                            <div className={styles.head}>
                                <div className={styles.id}>
                                    ID
                                </div>
                                <div className={styles.title}>
                                    Наименование
                                </div>
                                <div className={styles.price}>
                                    Цена
                                </div>
                                <div className={styles.amount}>
                                    Количество
                                </div>
                                <div className={styles.total}>
                                    Стоимость
                                </div>
                            </div>
                            {data?.order_products?.map(item => (
                                <div>
                                    <div className={styles.id}>
                                        {item?.id}
                                    </div>
                                    <div className={styles.title}>
                                        {item?.good?.title}
                                    </div>
                                    <div className={styles.price}>
                                        {item.price} {data?.currency_symbol}
                                    </div>
                                    <div className={styles.amount}>
                                        {item.count}
                                    </div>
                                    <div className={styles.total}>
                                        {item.total} {data?.currency_symbol}
                                    </div>
                                </div>
                            ))}
                            
                    </div>
                )
            }
        </div>
    )
}
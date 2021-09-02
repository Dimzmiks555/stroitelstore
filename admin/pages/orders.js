import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from './products.module.css'


 export default function Orders() {

    const [data, setData] = useState([])

    function fetchData(page) {
        fetch(`http://localhost/api/orders`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
        })
    }




    useEffect(() => {
        fetchData()
    }, [data[0]])


     return (
         <Layout title="Заказы">
             
             <div className={styles.orders}>
                 <div>
                    <div className={styles.header}>
                        Всего заказов: {data?.count}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Номер заказа
                                </td>
                                <td>
                                    Адрес
                                </td>
                                <td>
                                    Покупатель
                                </td>
                                
                                <td>
                                    Способ получения
                                </td>
                                <td>
                                    Способ оплаты
                                </td>
                                <td>
                                    Статус
                                </td>
                                <td>
                                    Сумма заказа
                                </td>
                                <td>
                                    Дата
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.rows?.map(item => (
                                    <tr>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            {item?.address}
                                        </td>
                                        <td>
                                            {item.user?.surname} {item.user?.name}
                                        </td>
                                        <td>
                                            {item?.type == 'shop' ? "Самовывоз" : "Доставка"}
                                        </td>
                                        <td>
                                            {item?.payment == 'nal' ? "Наличные" : "Карта"}
                                        </td>
                                        <td>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {item?.total}
                                        </td>
                                        <td>
                                            {item?.date}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                 </div>
             </div>

         </Layout>
     )
 }
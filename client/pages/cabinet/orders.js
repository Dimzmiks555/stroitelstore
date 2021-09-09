import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './orders.module.css';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Footer from '../../components/Footer/Footer';
import CabinetStore from '../../components/Cabinet/CabinetStore';
import { useEffect, useState } from 'react';
import Cabinet from '../../components/Cabinet/Cabinet';
import HeaderStore from '../../components/Header/HeaderStore';
import MobileMenu from '../../components/MobileMenu/MobileMenu';

import HOST from '../../HOST';

const Index = observer(() => {

    const [data, setData] = useState([])


    useEffect(() => {

        fetch(`${HOST.host}/api/orders?user_id=${HeaderStore?.userData?.id}`)
        .then(res => res.json())
        .then(json => {
            setData(json?.rows)
            console.log(json?.rows)
        })

    }, [data[0]?.id])


    
  return (
    <>
    <Head>
      <title>Мои заказы</title>
    </Head>
    
    <Catalog />
    <Header />
    <div className={Mainstyles.page}>
        <div className={styles.orders}>
        <h1>Мои заказы</h1>
            {data.map((order, index) => (
                <>
                
                <div className={styles.order}>
                    <div>
                        <div>
                            <div>
                                Заказ № {order?.id} от {new Date(order?.createdAt).toLocaleDateString()} {new Date(order?.createdAt).toLocaleTimeString()} {order?.status}
                            </div>
                            <div>
                                {order?.type == 'shop' ? 'Самовывоз' : 'Доставка'} по адресу {order?.address}
                            </div>
                        </div>
                        <div>
                            <div>
                                Итого {order?.total}
                            </div>
                            <div>
                                Оплата {order?.payment == 'nal' ? 'Наличными или картой при получении' : 'Банковская карта'}
                            </div>
                        </div>
                        <div>
                            <div>
                                Подробнее
                            </div>
                        </div>
                    </div>
                    <div>
                        <table border="1">
                            <tbody>
                            <tr>
                                    <td>
                                        ID
                                    </td>
                                    <td>
                                        Наименование
                                    </td>
                                    <td>
                                        Цена
                                    </td>
                                    <td>
                                        Количество
                                    </td>
                                    <td>
                                        Стоимость
                                    </td>
                                </tr>
                            {order?.order_products?.map(item => (
                                <tr>
                                    <td>
                                        {item?.id}
                                    </td>
                                    <td>
                                        {item?.good?.title}
                                    </td>
                                    <td>
                                        {item.price} {order?.currency_symbol}
                                    </td>
                                    <td>
                                        {item.count}
                                    </td>
                                    <td>
                                        {item.total} {order?.currency_symbol}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                
                </>

            ))}
        </div>
    </div>
    <Footer></Footer>
    <MobileMenu></MobileMenu>
    </>
  )

});
export default Index
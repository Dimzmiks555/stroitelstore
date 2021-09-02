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
const Index = observer(() => {

    const [data, setData] = useState([])


    useEffect(() => {

        fetch(`http://${HOST.host}/api/orders?user_id=${HeaderStore?.userData?.id}`)
        .then(res => res.json())
        .then(json => {
            setData(json)
            console.log(json)
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
                <table border="1">
                <thead>
                    <tr>
                        <td>
                            Заказ № {order?.id}
                        </td>
                        <td>
                            Дата создания
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            Статус {order?.status == 'pending' ? (': на рассмотрении') : ''}
                        </td>
                        <td>
                            Общая сумма заказа : {order?.total} {order?.currency_symbol}
                        </td>
                    </tr>
                </thead>
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
                            {item?.good?.guid}
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

            ))}
        </div>
    </div>
    <Footer></Footer>
    </>
  )

});
export default Index
import Header from '../../components/Header/Header';
import Mainstyles from '../index.module.css';
import styles from './orders.module.css';
import Catalog from "../../components/Catalog";
import Head from 'next/head';
import { observer } from 'mobx-react';
import Footer from '../../components/Footer/Footer';
import CabinetStore from '../../components/Cabinet/CabinetStore';
import { useEffect } from 'react';
import Cabinet from '../../components/Cabinet/Cabinet';
const Index = observer(() => {

    useEffect(() => {
        CabinetStore.getOrders()
        console.log(CabinetStore.orders)
    }, [CabinetStore.orders[0]?.id])


    
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
            {CabinetStore.orders.map((order, index) => (
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
                {CabinetStore.orders[index]?.line_items.map(item => (
                    <tr>
                        <td>
                            {item.product_id}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.price} {order?.currency_symbol}
                        </td>
                        <td>
                            {item.quantity}
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